using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OurToolModel.Parents
{
    public class ManagePara<T> : ParaBase
    {
        /// <summary>
        /// 初始参数
        /// </summary>
        public ManagePara()
        {
            Para = default(T);
        }

        /// <summary>
        /// 自定义参数
        /// </summary>
        public T Para { get; set; }

        /// <summary>
        /// 页码
        /// </summary>
        public int PageIndex { get; set; }

        /// <summary>
        /// 每页大小
        /// </summary>
        public int PageSize { get; set; }


    }
}
