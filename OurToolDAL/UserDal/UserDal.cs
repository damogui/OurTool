using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using mfg_word_Dal;
using MySql.Data.MySqlClient;
using OurToolDAL.SqlTran;
using OurToolModel;

namespace OurToolDAL.User
{
    public class UserDal
    {


        public List<OurUser> GetUserList(int orgId)
        {

            string sqlSearch = "SELECT `UserID`, `LoginID`, `Tel`, `UserRole`, `OrgID`, `SchoolID`, `IsDefaultTel`, `IsEffect`, `IsFrozen`, `IsFirstLogin`, `Gender`, `UserName`, `PWD`, `EnterTime`, `ActionTime`, `ExpireTime`, `CreateTime`, `EditTime`, `OperationUser`, `HeadUrl`, `Remark` FROM `ourtool`.`our_user` WHERE orgid=@orgid;";
            return DBHelper.GetDataInfolList(sqlSearch, GetUserListTran, new MySqlParameter("@orgid", orgId));

        }

        /// <summary>
        /// 学生列表转换
        /// </summary>
        /// <param name="arg"></param>
        /// <returns></returns>
        private OurUser GetUserListTran(IDataReader arg)
        {
            OurUser ourUser = new OurUser();

            ourUser.UserID = DataRecord.GetInt32(arg, "UserID");
            ourUser.Tel = DataRecord.GetString(arg, "Tel");
            ourUser.UserName = DataRecord.GetString(arg, "UserName");
            ourUser.CreateTime = DataRecord.GetDateTime(arg, "CreateTime");
            return ourUser;
        }


    }
}
