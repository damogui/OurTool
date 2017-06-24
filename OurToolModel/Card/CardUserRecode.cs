using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OurToolModel.Card
{
   public class CardUserRecode
    {

        /// <summary>
        /// 用户ID
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 用户ID
        /// </summary>
        public int UserId { get; set; }
     
        /// <summary>
        /// 消费金额
        /// </summary>
        public decimal OptMoney { get; set; }

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
      
    }
}
