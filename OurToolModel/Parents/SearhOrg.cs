using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OurToolModel.Parents
{
   public class SearhOrg : Page
    {
        ///// <summary>
        ///// 机构ID
        ///// </summary>
        //public int OrgId { get; set; }

        /// <summary>
        /// 搜索关键字
        /// </summary>
        public string KeyWord { get; set; }

    }

    /// <summary>
    /// 公用分页类
    /// </summary>
    public class Page
    {
        /// <summary>
        /// 页码
        /// </summary>
        public int PageIndex { get; set; }

        /// <summary>
        /// 每页大小
        /// </summary>
        public int PageSize { get; set; }
    }

    /// <summary>
    /// 搜索用
    /// </summary>
    public class SearhPre : Page
    {


        /// <summary>
        /// 机构ID
        /// </summary>
        public int OrgId { get; set; }

        /// <summary>
        /// 搜索关键字
        /// </summary>
        public string KeyWord { get; set; }

        /// <summary>
        /// 校区id
        /// </summary>
        public int SchoolId { get; set; }

        /// <summary>
        /// 角色id
        /// </summary>
        public int RoleId { get; set; }

        /// <summary>
        /// 状态id
        /// </summary>
        public int StateId { get; set; }




    }
}
