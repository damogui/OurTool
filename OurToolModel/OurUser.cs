using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OurToolModel
{




    /// <summary>
    /// user的表的添加
    /// </summary>
    public class OurUser
    {

        /// <summary>
        /// 用户ID
        /// </summary>
        public int UserID { get; set; }

        /// <summary>
        ///登录ID---系统自动生成的登录账号
        /// </summary>
        public int LoginID { get; set; }

        /// <summary>
        /// 手机号
        /// </summary>
        public string Tel { get; set; }

        /// <summary>
        /// 角色：1为MFG超级管理员，2为机构超级管理员，3为校长，4为老师，5为学生，6为家长;
        /// </summary>
        public byte UserRole { get; set; }


        /// <summary>
        /// 机构ID
        /// </summary>
        public int OrgId { get; set; }

        /// <summary>
        /// 学校ID
        /// </summary>
        public int SchoolId { get; set; }

        /// <summary>
        /// 是否只允许手机号登录；1是；0否；
        /// </summary>
        public bool IsDefaultTel { get; set; }
        /// <summary>
        /// 是否有效用户：1是，0否；
        /// </summary>
        public bool IsEffect { get; set; }

        /// <summary>
        /// 是否冻结：1是；0否；
        /// </summary>
        public bool IsFrozen { get; set; }

        /// <summary>
        /// 是否第一次登录，1是；0否；
        /// </summary>
        public bool IsFirstLogin { get; set; }

        /// <summary>
        /// 性别：1为男；0为女
        /// </summary>
        public bool Gender { get; set; }


        /// <summary>
        ///姓名
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// 密码
        /// </summary>
        public string Pwd { get; set; }

        /// <summary>
        ///入职时间
        /// </summary>
        public DateTime EnterTime { get; set; }



        /// <summary>
        /// 激活时间
        /// </summary>
        public DateTime ActionTime { get; set; }

        /// <summary>
        /// 过期时间
        /// </summary>
        public DateTime ExpireTime { get; set; }


        /// <summary>
        /// 添加时间
        /// </summary>
        public DateTime CreateTime { get; set; }

        /// <summary>
        /// 修改时间
        /// </summary>
        public DateTime EditTime { get; set; }


        /// <summary>
        /// 添加人ID
        /// </summary>
        public int OperationUser { get; set; }

        /// <summary>
        /// 头像URL
        /// </summary>
        public string HeadUrl { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string Remark { get; set; }

    }
}
