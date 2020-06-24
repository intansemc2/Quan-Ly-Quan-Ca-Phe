using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class KhuyenMaiStoreContext : BaseStoreContext
    {

        public override BaseModel ConvertReaderToModelFind(MySqlDataReader reader)
        {
            BaseModel model = new KhuyenMai()
            {
                IdKhuyenMai = Convert.ToInt32(reader["ID_KHUYEN_MAI"].ToString()),
                Ten = reader["TEN"].ToString(),
                ThoiGIanDienRa = reader["THOI_GIAN_DIEN_RA"].ToString(),
                ThoiGIanKetThuc = reader["THOI_GIAN_KET_THUC"].ToString()
            };

            return model;
        }

        public override BaseModel ConvertReaderToModelGetAll(MySqlDataReader reader)
        {
            BaseModel model = new KhuyenMai()
            {
                IdKhuyenMai = Convert.ToInt32(reader["ID_KHUYEN_MAI"].ToString()),
                Ten = reader["TEN"].ToString(),
                ThoiGIanDienRa = reader["THOI_GIAN_DIEN_RA"].ToString(),
                ThoiGIanKetThuc = reader["THOI_GIAN_KET_THUC"].ToString()
            };

            return model;
        }

        public override MySqlCommand CreateQueryAdd(MySqlConnection conn, BaseModel model)
        {
            KhuyenMai currentModel = (KhuyenMai)model;
            String query = "INSERT INTO khuyen_mai (ID_KHUYEN_MAI,TEN,THOI_GIAN_DIEN_RA,THOI_GIAN_KET_THUC) VALUES (@ID_KHUYEN_MAI,@TEN,@THOI_GIAN_DIEN_RA,@THOI_GIAN_KET_THUC)";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_KHUYEN_MAI", currentModel.IdKhuyenMai);
            mySqlCommand.Parameters.AddWithValue("TEN", currentModel.Ten);
            mySqlCommand.Parameters.AddWithValue("THOI_GIAN_DIEN_RA", currentModel.ThoiGIanDienRa);
            mySqlCommand.Parameters.AddWithValue("THOI_GIAN_KET_THUC", currentModel.ThoiGIanKetThuc);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryDelete(MySqlConnection conn, BaseModel model)
        {
            KhuyenMai currentModel = (KhuyenMai)model;
            String query = "DELETE FROM khuyen_mai WHERE  BAN.ID_KHUYEN_MAI = @ID_KHUYEN_MAI ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_KHUYEN_MAI", currentModel.IdKhuyenMai);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryEdit(MySqlConnection conn, BaseModel oldmodel, BaseModel newmodel)
        {
            KhuyenMai oldcurrentModel = (KhuyenMai)oldmodel;
            KhuyenMai newcurrentModel = (KhuyenMai)newmodel;
            String query = "UPDATE khuyen_mai SET @ID_KHUYEN_MAI,@TEN,@THOI_GIAN_DIEN_RA,@THOI_GIAN_KET_THUC WHERE  BAN.ID_KHUYEN_MAI = @OLD_ID_KHUYEN_MAI ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_KHUYEN_MAI", newcurrentModel.IdKhuyenMai);
            mySqlCommand.Parameters.AddWithValue("TEN", newcurrentModel.Ten);
            mySqlCommand.Parameters.AddWithValue("THOI_GIAN_DIEN_RA", newcurrentModel.ThoiGIanDienRa);
            mySqlCommand.Parameters.AddWithValue("THOI_GIAN_KET_THUC", newcurrentModel.ThoiGIanKetThuc);
            mySqlCommand.Parameters.AddWithValue("OLD_ID_KHUYEN_MAI", oldcurrentModel.IdKhuyenMai);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryFind(MySqlConnection conn, BaseModel model)
        {
            KhuyenMai currentModel = (KhuyenMai)model;

            String query = "SELECT * FROM khuyen_mai WHERE 1=1 ";
            if (currentModel.IdKhuyenMai >= 0) query += " AND khuyen_mai.ID_KHUYEN_MAI = @ID_KHUYEN_MAI ";
            if (currentModel.Ten != null) query += " AND khuyen_mai.TEN = @TEN ";
            if (currentModel.ThoiGIanDienRa != null) query += " AND khuyen_mai.THOI_GIAN_DIEN_RA = @THOI_GIAN_DIEN_RA ";
            if (currentModel.ThoiGIanKetThuc != null) query += " AND khuyen_mai.THOI_GIAN_KET_THUC = @THOI_GIAN_KET_THUC ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            if (currentModel.IdKhuyenMai >= 0) mySqlCommand.Parameters.AddWithValue("ID_KHUYEN_MAI", currentModel.IdKhuyenMai);
            if (currentModel.Ten != null) mySqlCommand.Parameters.AddWithValue("TEN", currentModel.Ten);
            if (currentModel.ThoiGIanDienRa != null) mySqlCommand.Parameters.AddWithValue("THOI_GIAN_DIEN_RA", currentModel.ThoiGIanDienRa);
            if (currentModel.ThoiGIanKetThuc != null) mySqlCommand.Parameters.AddWithValue("THOI_GIAN_KET_THUC", currentModel.ThoiGIanKetThuc);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryGetAll(MySqlConnection conn)
        {
            String query = "SELECT * FROM khuyen_mai";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);

            return mySqlCommand;
        }

    }
}

