using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OurToolModel.Parents
{
   public class ParaBase
    {
        /// <summary>
        /// 角色：1为MFG超级管理员，2为机构超级管理员，3为校长，4为老师，5为学生，6为家长; 7； 合伙人；8为财务；9为资源；
        /// </summary>
        public byte UserRole { get; set; }

        /// <summary>
        /// 登录ID
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// 机构ID
        /// </summary>
        public int OrgId { get; set; }

//        /// <summary>
//        /// 学校ID
//        /// </summary>
//        public int SchoolId { get; set; }
//
//        /// <summary>
//        /// 部门ID
//        /// </summary>
//        public int StructureId { get; set; }
//
//
//        /// <summary>
//        /// 0表示六三制，1表示五四制
//        /// </summary>
//        public byte EduType { get; set; }
//
//        /// <summary>
//        /// 0表示理科，1表示文科，2表示不分文理
//        /// </summary>
//        public byte ArtType { get; set; }
//
//        /// <summary>
//        /// 其它标签
//        /// </summary>
//        public string TagId { get; set; }
    }
}
