using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OurToolDAL.User;
using OurToolModel;

namespace OurToolBll.Card
{
   public class CardBll
    {

        UserDal userDal = new UserDal();

        /// <summary>
        /// 根据id返回值
        /// </summary>
        /// <param name="orgId"></param>
        /// <returns></returns>
        public List<OurUser> GetUserList(int orgId)
        {
            return userDal.GetUserList(orgId);

        }
    }
}
