namespace OurToolModel.Credit
{
  public  class ComName
    {

        public string Name { get; set; }
        public string Id { get; set; }
        public string Type { get; set; }
//        public string PhoneNumber { get; set; }
//        public string Bank { get; set; }
//        public string Bankaccount { get; set; }
    }


    /// <summary>
    /// 基础的参数
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class NamaePara<T>
    {
        /// <summary>
        /// 初始参数
        /// </summary>
        public NamaePara()
        {
            Data = default(T);
        }

        /// <summary>
        /// 自定义参数
        /// </summary>
        public T Data { get; set; }
        public string State { get; set; }
      

    }
}
