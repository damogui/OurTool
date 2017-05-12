using System;
using System.Data;

namespace OurToolDAL.SqlTran
{


    public static class DataRecord
    {
        public static string GetString(IDataRecord rec, int fldnum)
        {
            return rec.IsDBNull(fldnum) ? "" : rec.GetString(fldnum);
        }

        public static decimal GetDecimal(IDataRecord rec, int fldnum)
        {
            return rec.IsDBNull(fldnum) ? 0 : rec.GetDecimal(fldnum);
        }

        public static int GetInt(IDataRecord rec, int fldnum)
        {
            return rec.IsDBNull(fldnum) ? 0 : rec.GetInt32(fldnum);
        }

        public static bool GetBoolean(IDataRecord rec, int fldnum)
        {
            return !rec.IsDBNull(fldnum) && rec.GetBoolean(fldnum);
        }

        public static byte GetByte(IDataRecord rec, int fldnum)
        {
            if (rec.IsDBNull(fldnum)) return 0;
            return rec.GetByte(fldnum);
        }

        public static DateTime GetDateTime(IDataRecord rec, int fldnum)
        {
            if (rec.IsDBNull(fldnum)) return new DateTime(0);
            return rec.GetDateTime(fldnum);
        }

        public static double GetDouble(IDataRecord rec, int fldnum)
        {
            if (rec.IsDBNull(fldnum)) return 0;
            return rec.GetDouble(fldnum);
        }

        public static float GetFloat(IDataRecord rec, int fldnum)
        {
            if (rec.IsDBNull(fldnum)) return 0;
            return rec.GetFloat(fldnum);
        }

        public static Guid GetGuid(IDataRecord rec, int fldnum)
        {
            if (rec.IsDBNull(fldnum)) return Guid.Empty;
            return rec.GetGuid(fldnum);
        }

        public static Int32 GetInt32(IDataRecord rec, int fldnum)
        {
            if (rec.IsDBNull(fldnum)) return 0;
            return rec.GetInt32(fldnum);
        }

        public static Int16 GetInt16(IDataRecord rec, int fldnum)
        {
            if (rec.IsDBNull(fldnum)) return 0;
            return rec.GetInt16(fldnum);
        }

        public static Int64 GetInt64(IDataRecord rec, int fldnum)
        {
            if (rec.IsDBNull(fldnum)) return 0;
            return rec.GetInt64(fldnum);
        }

        public static char GetChar(IDataRecord rec, int fldnum)
        {
            if (rec.IsDBNull(fldnum)) return char.Parse("");
            return rec.GetChar(fldnum);

        }

        // By Name 
        public static string GetString(IDataRecord rec, string fldname)
        {
            return GetString(rec, rec.GetOrdinal(fldname));
        }

        public static decimal GetDecimal(IDataRecord rec, string fldname)
        {
            return GetDecimal(rec, rec.GetOrdinal(fldname));
        }

        public static int GetInt(IDataRecord rec, string fldname)
        {
            return GetInt(rec, rec.GetOrdinal(fldname));
        }

        public static bool GetBoolean(IDataRecord rec, string fldname)
        {
            return GetBoolean(rec, rec.GetOrdinal(fldname));
        }

        public static byte GetByte(IDataRecord rec, string fldname)
        {
            return GetByte(rec, rec.GetOrdinal(fldname));
        }

        public static DateTime GetDateTime(IDataRecord rec,
                                           string fldname)
        {
            return GetDateTime(rec, rec.GetOrdinal(fldname));
        }

        public static double GetDouble(IDataRecord rec, string fldname)
        {
            return GetDouble(rec, rec.GetOrdinal(fldname));
        }

        public static float GetFloat(IDataRecord rec, string fldname)
        {
            return GetFloat(rec, rec.GetOrdinal(fldname));
        }

        public static Guid GetGuid(IDataRecord rec, string fldname)
        {
            return GetGuid(rec, rec.GetOrdinal(fldname));
        }

        public static Int32 GetInt32(IDataRecord rec, string fldname)
        {
            return GetInt32(rec, rec.GetOrdinal(fldname));
        }

        public static Int16 GetInt16(IDataRecord rec, string fldname)
        {
            return GetInt16(rec, rec.GetOrdinal(fldname));
        }

        public static Int64 GetInt64(IDataRecord rec, string fldname)
        {
            return GetInt64(rec, rec.GetOrdinal(fldname));
        }

        public static char GetChar(IDataRecord rec, string fldname)
        {
            return GetChar(rec, rec.GetOrdinal(fldname));
        }
    }
}
