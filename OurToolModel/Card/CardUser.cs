using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OurToolModel.Card
{
   public class CardUser
    {

        /// <summary>
        /// 用户ID
        /// </summary>
        public int UserId { get; set; }
        /// <summary>
        /// 手机号
        /// </summary>
        public string Tel { get; set; }
        /// <summary>
        /// 用户姓名
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// 角色：1:一级会员2二级会员3三级会员
        /// </summary>
        public int Role { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
       public string Mark { get; set; }
        /// <summary>
        /// 卡号
        /// </summary>
        public int CardNum { get; set; }
        /// <summary>
        /// 卡余额
        /// </summary>
        public int CardMoney { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreateTime { get; set; }
        /// <summary>
        /// 最近消费时间
        /// </summary>
        public DateTime EditeTime { get; set; }

    }
}
