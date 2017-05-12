using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Text;
using System.Web;

namespace OurToolCommon
{

    /// <summary>
    /// 帮助类(校验、枚举等公共的方法)
    /// </summary>
    public class CommonTools
    {
        /// <summary>
        /// 生成登录账号
        /// </summary>
        /// <returns></returns>
        public static int GetLoginId()
        {
            string x = DateTime.Now.Ticks.ToString();
            int number1 = new Random().Next(1, 9);
            return Convert.ToInt32(number1 + x.Substring(x.Length - 7, 7));
        }

        /// <summary>
        /// 根据小写返回大写
        /// </summary>
        /// <param name="i"></param>
        /// <returns></returns>
        public static string GetNumTran(int i)
        {

            switch (i)
            {
                case 1:
                    return "一";

                case 2:
                    return "二";

                case 3:
                    return "三";

                case 4:
                    return "四";

                case 5:
                    return "五";

                case 6:
                    return "六";

                case 7:
                    return "七";

                case 8:
                    return "八";

                case 9:
                    return "九";
                case 10:
                    return "十";
                case 11:
                    return "十一";
                case 12:
                    return "十二";

                case 13:
                    return "十三";

                case 14:
                    return "十四";

                case 15:
                    return "十五";

                case 16:
                    return "十六";
                default:

                    return i.ToString();



            }

        }

        /// <summary>
        /// 验证手机号格式
        /// </summary>
        /// <param name="telphoneNum"></param>
        /// <returns></returns>
        public static bool IsTelphoneNum(string telphoneNum)
        {
            return System.Text.RegularExpressions.Regex.IsMatch(telphoneNum, @"^1[3|4|5|7|8]\d{9}$");
        }

        /// <summary>
        /// 验证邮箱
        /// </summary>
        /// <param name="emailAddress"></param>
        /// <returns></returns>
        public static bool IsEmailAddress(string emailAddress)
        {
            return System.Text.RegularExpressions.Regex.IsMatch(emailAddress, @"^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.(?:com|cn)$");
        }
    }


    /// <summary>
    /// 操作缓存类
    /// </summary>
    public static class CacheManage
    {
        /// <summary>
        /// 操作缓存
        /// </summary>
        /// <param name="userID">用户ID</param>
        /// <param name="token">token/密码/错误时间/错误次数</param>
        /// 第一种情况：userID为用户ID、token为List集合；第一个为sessionID; 第二个为用户密码；第三个为为错误时间；第四个参数为错误次数
        /// 第二种情况：userID为Org+电话号码、token为List集合；第一个为通过短信找回的时间；第二个为短信码
        /// 第一种情况，当系统运行时，从数据库里加载到缓存；第二种情况只有缓存里有；
        /// <returns></returns>
        public static bool EditCache(string userID, List<string> token)
        {
            var ok = true;
            try
            {
                var cacheKey = HttpRuntime.Cache.Get(userID);
                if (cacheKey == null)
                {
                    HttpRuntime.Cache.Insert(userID, token);
                }
                else
                {
                    HttpRuntime.Cache.Remove(userID);
                    HttpRuntime.Cache.Insert(userID, token);
                }
            }
            catch
            {
                ok = false;
            }
            return ok;
        }

        /// <summary>
        /// 移除Cache
        /// </summary>
        /// <param name="userID">cache键</param>
        /// <returns></returns>
        public static bool RemoveCache(string userID)
        {
            var ok = true;
            try
            {
                var cacheKey = HttpRuntime.Cache.Get(userID);
                if (cacheKey == null)
                {

                }
                else
                {
                    HttpRuntime.Cache.Remove(userID);
                }
            }
            catch
            {
                ok = false;
            }
            return ok;
        }

        /// <summary>
        /// 获取缓存
        /// </summary>
        /// <param name="userID">用户ID</param>
        /// <returns>token/密码/错误时间/错误次数</returns>
        public static List<string> GetToken(string userID)
        {
            var token = HttpRuntime.Cache.Get(userID);
            return token == null ? new List<string>() : token as List<string>;
        }

    }

    /// <summary>
    /// 加密算法
    /// </summary>
    public class EncryptHelper
    {
        #region 公用加密方法
        /// <summary>
        /// 加密字符串
        /// </summary>
        /// <param name="Str">传入的明文</param>
        /// <param name="Key">密钥</param>
        /// <returns>返回密文</returns>
        public static String Encrypt(string Str, string Key)
        {
            System.Text.Encoding encoder = System.Text.Encoding.UTF8;
            string result = string.Empty;
            try
            {
                result = System.Convert.ToBase64String(Encrypt(encoder.GetBytes(Str), encoder.GetBytes(Key)));
            }
            catch (Exception)
            {
                return null;
            }
            return result;
        }

        /// <summary>
        /// 解密字符串
        /// </summary>
        /// <param name="Str">传入的加密字符串</param>
        /// <param name="Key">密钥</param>
        /// <returns>返回明文</returns>
        public static string Decrypt(string Str, string Key)
        {
            System.Text.Encoding encoder = System.Text.Encoding.UTF8;
            string result = string.Empty;
            try
            {
                result = encoder.GetString(Decrypt(System.Convert.FromBase64String(Str), encoder.GetBytes(Key)));
            }
            catch (Exception)
            {
                return null;
            }
            return result;
        }

        private static Byte[] Encrypt(Byte[] Data, Byte[] Key)
        {
            if (Data.Length == 0)
            {
                return Data;
            }
            return ToByteArray(Encrypt(ToUInt32Array(Data, true), ToUInt32Array(Key, false)), false);
        }
        private static Byte[] Decrypt(Byte[] Data, Byte[] Key)
        {
            if (Data.Length == 0)
            {
                return Data;
            }
            return ToByteArray(Decrypt(ToUInt32Array(Data, false), ToUInt32Array(Key, false)), true);
        }
        private static UInt32[] Encrypt(UInt32[] v, UInt32[] k)
        {
            Int32 n = v.Length - 1;
            if (n < 1)
            {
                return v;
            }
            if (k.Length < 4)
            {
                UInt32[] Key = new UInt32[4];
                k.CopyTo(Key, 0);
                k = Key;
            }
            UInt32 z = v[n], y = v[0], delta = 0x9E3779B9, sum = 0, e;
            Int32 p, q = 6 + 52 / (n + 1);
            while (q-- > 0)
            {
                sum = unchecked(sum + delta);
                e = sum >> 2 & 3;
                for (p = 0; p < n; p++)
                {
                    y = v[p + 1];
                    z = unchecked(v[p] += (z >> 5 ^ y << 2) + (y >> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z));
                }
                y = v[0];
                z = unchecked(v[n] += (z >> 5 ^ y << 2) + (y >> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z));
            }
            return v;
        }
        private static UInt32[] Decrypt(UInt32[] v, UInt32[] k)
        {
            Int32 n = v.Length - 1;
            if (n < 1)
            {
                return v;
            }
            if (k.Length < 4)
            {
                UInt32[] Key = new UInt32[4];
                k.CopyTo(Key, 0);
                k = Key;
            }
            UInt32 z = v[n], y = v[0], delta = 0x9E3779B9, sum, e;
            Int32 p, q = 6 + 52 / (n + 1);
            sum = unchecked((UInt32)(q * delta));
            while (sum != 0)
            {
                e = sum >> 2 & 3;
                for (p = n; p > 0; p--)
                {
                    z = v[p - 1];
                    y = unchecked(v[p] -= (z >> 5 ^ y << 2) + (y >> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z));
                }
                z = v[n];
                y = unchecked(v[0] -= (z >> 5 ^ y << 2) + (y >> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z));
                sum = unchecked(sum - delta);
            }
            return v;
        }
        private static UInt32[] ToUInt32Array(Byte[] Data, Boolean IncludeLength)
        {
            Int32 n = (((Data.Length & 3) == 0) ? (Data.Length >> 2) : ((Data.Length >> 2) + 1));
            UInt32[] Result;
            if (IncludeLength)
            {
                Result = new UInt32[n + 1];
                Result[n] = (UInt32)Data.Length;
            }
            else
            {
                Result = new UInt32[n];
            }
            n = Data.Length;
            for (Int32 i = 0; i < n; i++)
            {
                Result[i >> 2] |= (UInt32)Data[i] << ((i & 3) << 3);
            }
            return Result;
        }
        private static Byte[] ToByteArray(UInt32[] Data, Boolean IncludeLength)
        {
            Int32 n;
            if (IncludeLength)
            {
                n = (Int32)Data[Data.Length - 1];
            }
            else
            {
                n = Data.Length << 2;
            }
            Byte[] Result = new Byte[n];
            for (Int32 i = 0; i < n; i++)
            {
                Result[i] = (Byte)(Data[i >> 2] >> ((i & 3) << 3));
            }
            return Result;
        }

        #endregion
    }


    /// <summary>
    /// 验证码帮助类
    /// </summary>
    public class AuthCodeHelper
    {
        public static List<string> authCodes = new List<string>();
        public static Random rd = new Random();

        public static void InitAuthCode()
        {
            do
            {
                string authcode = CreateRandomCode(4);
                if (!authCodes.Contains(authcode))
                {
                    authCodes.Add(authcode);
                }
            } while (authCodes.Count < 500);
        }

        /// <summary>生成验证码
        /// </summary>
        /// <param name="codeCount">验证码的长度</param>
        /// <returns>验证码</returns>
        private static string CreateRandomCode(int codeCount)
        {
            string allChar = "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,W,X,Y,Z";
            string[] allCharArray = allChar.Split(',');
            string randomCode = "";
            int temp = -1;
            do
            {
                temp = rd.Next(0, 35);
                randomCode += (allCharArray[temp] + " ");
            } while (randomCode.Length < 8);
            return randomCode;
        }

        /// <summary>
        /// 生成验证码图片
        /// </summary>
        /// <param name="checkCode"></param>
        /// <returns></returns>
        public static MemoryStream CreateImage(string checkCode)
        {
            //int iwidth = (int)(checkCode.Length * 11.5);
            using (Bitmap image = new Bitmap(100, 40))
            {
                using (Graphics g = Graphics.FromImage(image))
                {
                    //笔
                    using (Pen blackPen = new Pen(Color.FromArgb(210, 210, 210), 2))
                    {
                        Random rand = new Random();
                        g.Clear(Color.White);

                        for (int i = 0; i < 4; i++)
                        {
                            int y = rand.Next(image.Height);
                            int x = rand.Next(image.Width);
                            g.DrawLine(blackPen, 0, y, x, 0);
                            g.DrawLine(blackPen, image.Width, y, x, image.Height);
                        }
                    }

                    //字体
                    using (Font f = new Font("Microsoft Yahei", 19))
                    {
                        using (Brush b = new SolidBrush(Color.FromArgb(127, 127, 127)))
                        {
                            g.DrawString(checkCode, f, b, 2, 7);
                        }
                    }
                    //生成图片
                    using (MemoryStream ms = new MemoryStream())
                    {
                        image.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
                        return ms;
                    }
                }
            }
        }



    }


    /// <summary>
    /// 分页
    /// </summary>
    public class PageHelper
    {
        /// <summary>
        /// 机构及MFG管理功能---分页栏
        /// </summary>
        /// <param name="pageSize">每页多少条数据</param>
        /// <param name="currentPage">第几页</param>
        /// <param name="totalCount">合计多少数据</param>
        /// <returns></returns>
        public static string ShowPageBar(int pageSize, int currentPage, int totalCount)
        {
            pageSize = (pageSize == 0 ? 8 : pageSize);
            var totalPages = Math.Max((totalCount + pageSize - 1) / pageSize, 1); //总页数
            var output = new StringBuilder();
            if (totalPages > 1)
            {
                if (currentPage > 1)
                {
                    output.Append("<a href='#' data-num='1' class='pre-page inline mr20'>首页</a>");//
                    output.AppendFormat(@"<a href='#' data-num='{0}' class='pre-page inline mr20 pre-e'>上一页</a>", currentPage - 1);//上一页
                }
                output.Append(@"<ul class='page-box inline mr20 mb20'>");
                if (totalPages > 7)
                {
                    int currint = 3;
                    if (currentPage < 4)
                    {
                        #region currentPage < 4
                        for (int i = 0; i <= 6; i++)
                        {
                            if (currentPage == i + 1)
                            {
                                output.AppendFormat(" <li><a href='#' data-num='{0}' class='active'>{0}</a></li> ", currentPage);
                            }
                            else
                            {
                                if (i == 6)
                                {
                                    output.AppendFormat(" <li><a href='#' data-num='{0}' >...</a></li> ", 7);
                                    output.AppendFormat(" <li><a href='#' data-num='{0}' >{0}</a></li> ", totalPages);//最后页
                                }
                                else
                                {
                                    output.AppendFormat(" <li><a href='#' data-num='{0}' >{0}</a></li> ", i + 1);
                                }
                            }
                        }
                        #endregion
                    }
                    else if (currentPage >= 4 && currentPage < totalPages - 3)
                    {
                        #region 其它
                        for (int i = 0; i <= 6; i++)
                        {
                            if (i == 0)
                            {
                                output.AppendFormat(" <li><a href='#' data-num='{0}' >{0}</a> </li>", 1);//首页
                                output.AppendFormat(" <li><a href='#' data-num='{0}' >...</a> </li>", currentPage - 3);
                            }
                            else if (i == 3)//中间当前页
                            {
                                output.AppendFormat(" <li><a href='#' data-num='{0}' class='active'>{0}</a></li> ", currentPage);
                            }
                            else if (i == 6)
                            {
                                output.AppendFormat(" <li><a href='#' data-num='{0}' >...</a></li> ", currentPage + 3);
                                output.AppendFormat(" <li><a href='#' data-num='{0}' >{0}</a></li></li> ", totalPages);//最后页
                            }
                            else
                            {
                                output.AppendFormat("  <li><a href='#' data-num='{0}' >{0}</a></li> ", currentPage + i - currint);
                            }
                        }
                        #endregion
                    }
                    else
                    {
                        #region 其它
                        for (int i = 0; i <= 6; i++)
                        {
                            if (i == 0)
                            {
                                output.AppendFormat(" <li><a href='#' data-num='{0}' >{0}</a></li> ", 1);//首页
                                output.AppendFormat(" <li><a href='#' data-num='{0}' >...</a></li> ", totalPages - 6);
                            }
                            else
                            {
                                if (totalPages - 6 + i == currentPage)
                                {
                                    output.AppendFormat(" <li><a href='#' data-num='{0}' class='active'>{0}</a></li> ", currentPage);
                                }
                                else
                                {
                                    output.AppendFormat(" <li><a href='#' data-num='{0}' >{0}</a></li> ", totalPages - 6 + i);
                                }
                            }
                        }
                        #endregion
                    }
                }
                else
                {
                    #region 其它
                    for (int i = 0; i < totalPages; i++)
                    {
                        if (currentPage == i + 1)
                        {
                            output.AppendFormat(" <li><a href='#' data-num='{0}' class='active'>{0}</a></li> ", currentPage);
                        }
                        else
                        {
                            output.AppendFormat("  <li><a href='#' data-num='{0}' >{0}</a> </li>", i + 1);
                        }
                    }
                    #endregion
                }
                output.Append(@"</ul>");
                if (currentPage < totalPages)
                {
                    //处理下一页和尾页的链接 
                    output.AppendFormat(@" <a href='#' data-num='{0}' class='next-page inline next-e'>下一页</a> ", currentPage + 1);
                    output.AppendFormat(" <a href='#' data-num='{0}' class='next-page inline'>尾页</a> ", totalPages);
                }
            }
            return output.ToString();
        }


        /// <summary>
        /// 学生端---分页栏
        /// </summary>
        /// <param name="pageSize">每页多少条数据</param>
        /// <param name="currentPage">第几页</param>
        /// <param name="totalCount">合计多少数据</param>
        /// <returns></returns>
        public static string StudentShowPageBar(int pageSize, int currentPage, int totalCount)
        {
            pageSize = (pageSize == 0 ? 8 : pageSize);
            var totalPages = Math.Max((totalCount + pageSize - 1) / pageSize, 1); //总页数
            var output = new StringBuilder();
            if (totalPages > 1)
            {
                if (currentPage > 1)
                {
                    output.AppendFormat(@"<span data-set='{0}'>&lt;</span>", currentPage - 1);//上一页
                }

                if (totalPages > 7)
                {
                    int currint = 3;
                    if (currentPage < 4)
                    {
                        #region currentPage < 4
                        for (int i = 0; i <= 6; i++)
                        {
                            if (currentPage == i + 1)
                            {
                                output.AppendFormat("<span data-set='{0}' class='cur'>{0}</span>", currentPage);
                            }
                            else
                            {
                                if (i == 6)
                                {
                                    output.AppendFormat(" <span data-set='{0}' >...</span> ", 7);
                                    output.AppendFormat(" <span data-set='{0}' >{0}</span> ", totalPages);//最后页
                                }
                                else
                                {
                                    output.AppendFormat(" <span data-set='{0}' >{0}</span> ", i + 1);
                                }
                            }
                        }
                        #endregion
                    }
                    else if (currentPage >= 4 && currentPage < totalPages - 3)
                    {
                        #region 其它
                        for (int i = 0; i <= 6; i++)
                        {
                            if (i == 0)
                            {
                                output.AppendFormat(" <span data-set='{0}' >{0}</span> ", 1);//首页
                                output.AppendFormat(" <span data-set='{0}' >...</span> ", currentPage - 3);
                            }
                            else if (i == 3)//中间当前页
                            {
                                output.AppendFormat(" <span data-set='{0}' class='cur'>{0}</span> ", currentPage);
                            }
                            else if (i == 6)
                            {
                                output.AppendFormat(" <span data-set='{0}' >...</span> ", currentPage + 3);
                                output.AppendFormat(" <span data-set='{0}' >{0}</span> ", totalPages);//最后页
                            }
                            else
                            {
                                output.AppendFormat("  <span data-set='{0}' >{0}</span> ", currentPage + i - currint);
                            }
                        }
                        #endregion
                    }
                    else
                    {
                        #region 其它
                        for (int i = 0; i <= 6; i++)
                        {
                            if (i == 0)
                            {
                                output.AppendFormat(" <span data-set='{0}' >{0}</span> ", 1);//首页
                                output.AppendFormat(" <span data-set='{0}' >...</span> ", totalPages - 6);
                            }
                            else
                            {
                                if (totalPages - 6 + i == currentPage)
                                {
                                    output.AppendFormat(" <span data-set='{0}' class='cur'>{0}</span> ", currentPage);
                                }
                                else
                                {
                                    output.AppendFormat(" <span data-set='{0}' >{0}</span> ", totalPages - 6 + i);
                                }
                            }
                        }
                        #endregion
                    }
                }
                else
                {
                    #region 其它
                    for (int i = 0; i < totalPages; i++)
                    {
                        if (currentPage == i + 1)
                        {
                            output.AppendFormat(" <span data-set='{0}' class='cur'>{0}</span> ", currentPage);
                        }
                        else
                        {
                            output.AppendFormat("  <span data-set='{0}' >{0}</span> ", i + 1);
                        }
                    }
                    #endregion
                }

                if (currentPage < totalPages)
                {
                    //处理下一页和尾页的链接 
                    output.AppendFormat(@" <span data-set='{0}'>&gt;</span> ", currentPage + 1);
                }
            }
            return output.ToString();
        }
    }


    public class FileHelper
    {
        /// <summary> 获取图片文件扩展名
        /// </summary>
        /// <param name="bytes">文件字节数组</param>
        /// <returns></returns>
        public static string GetPicExtension(byte[] bytes)
        {
            using (MemoryStream ms = new MemoryStream(bytes))
            {
                using (BinaryReader r = new BinaryReader(ms))
                {
                    string fileclass = "";
                    byte buffer;

                    buffer = r.ReadByte();
                    fileclass = buffer.ToString();
                    buffer = r.ReadByte();
                    fileclass += buffer.ToString();

                    /*文件扩展名说明
                      *4946/104116 txt
                      *7173        gif 
                      *255216      jpg
                      *13780       png
                      *6677        bmp
                      *239187      txt,aspx,asp,sql
                      *208207      xls.doc.ppt
                      *6063        xml
                      *6033        htm,html
                      *4742        js
                      *8075        xlsx,zip,pptx,mmap,zip
                      *8297        rar   
                      *01          accdb,mdb
                      *7790        exe,dll           
                      *5666        psd 
                      *255254      rdp 
                      *10056       bt种子 
                      *64101       bat 
                      *4059        sgf
                      */

                    String[] fileType = { "255216", "7173", "6677", "13780" };
                    String[] fileExtName = { "jpg", "gif", "bmp", "png" };

                    String fExt = "";
                    for (int i = 0; i < fileType.Length; i++)
                    {
                        if (fileclass == fileType[i])
                        {
                            fExt = fileExtName[i];

                            break;
                        }
                    }
                    return fExt;
                }
            }
        }
    }
}
