using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OurToolModel.Parents
{
   

    /// <summary>
    /// 机构列表
    /// </summary>
    public class Org
    {
        /// <summary>
        /// 主键
        /// </summary>
        public int OrgId { get; set; }
        public string OrgName { get; set; }

        /// <summary>
        /// 图片地址
        /// </summary>
        public string ImgUrl { get; set; }
        /// <summary>
        /// 介绍
        /// </summary>
        public string Content { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public DateTime ReMark { get; set; }
        /// <summary>
        /// 联系人
        /// </summary>
        public string LInkMan { get; set; }
        public string LinkTel { get; set; }
        public string ProvinceId { get; set; }
        public string CityId { get; set; }
        public string CountyId { get; set; }
        public string CreateTime { get; set; }
        public string UpdateTime { get; set; }

        public string Address { get; set; }



    }


}
