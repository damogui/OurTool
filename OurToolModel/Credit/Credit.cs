namespace OurToolModel.Credit
{

    /// <summary>
    /// 公司信用代码
    /// </summary>
    public class Credit
    {
       
        public string Name { get; set; }
        public string CreditCode { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Bank { get; set; }
        public string BankAccount { get; set; }
    }
    /// <summary>
    /// 基础的参数
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class BasePara<T> 
    {
        /// <summary>
        /// 初始参数
        /// </summary>
        public BasePara()
        {
            Data = default(T);
        }

        /// <summary>
        /// 自定义参数
        /// </summary>
        public T Data { get; set; }
        public bool Success { get; set; }
        /// <summary>
        /// 页码
        /// </summary>
       // public int PageIndex { get; set; }

        /// <summary>
        /// 每页大小
        /// </summary>
        //public int PageSize { get; set; }


    }
}
