using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OurToolModel.Parents
{
    /// <summary>
    /// 响应数据
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class ManageResponse<T> : ResponseBase
    {
        public ManageResponse()
        {
            Data = default(T);
        }

        /// <summary>
        ///数据集合
        /// </summary>
        public T Data { get; set; }


    }

    /// <summary>
    /// 响应数据
    /// </summary>
    public class ResponseBase
    {
        private string _result;
        public ResponseBase()
        {
            Ok = true;
            Result = "Ok";
            Code ="1";
        }

        /// <summary>
        /// 默认状态
        /// </summary>
        public bool Ok { get; set; }

        /// <summary>
        /// 状态码
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// 异常说明；正常时为空
        /// </summary>
        public string Result { get; set; }
        

        /// <summary>
        /// 其它标签
        /// </summary>
        public string TagValue { get; set; }

        public int TempValue { get; set; }

        /// <summary>
        /// 当前第几页
        /// </summary>
        public int PageIndex { get; set; }

        /// <summary>
        /// 共多少条数据
        /// </summary>
        public int PageSum { get; set; }

        /// <summary> 分页字符串
        /// </summary>
        public string PagingStr { get; set; }

        /// <summary>
        /// 共多少条数据
        /// </summary>
        public int TotalCount => PageSum;

       
    }
}
