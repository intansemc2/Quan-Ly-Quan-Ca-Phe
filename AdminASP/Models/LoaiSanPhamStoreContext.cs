using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class LoaiSanPhamStoreContext : BaseStoreContext
    {

        public override BaseModel ConvertReaderToModelFind(MySqlDataReader reader)
        {
            BaseModel model = new LoaiSanPham()
            {
                IdLoaiSP = Convert.ToInt32(reader["ID_LOAISP"].ToString()),
                Ten = reader["TEN"].ToString()
            };

            return model;
        }

        public override BaseModel ConvertReaderToModelGetAll(MySqlDataReader reader)
        {
            BaseModel model = new LoaiSanPham()
            {
                IdLoaiSP = Convert.ToInt32(reader["ID_LOAISP"].ToString()),
                Ten = reader["TEN"].ToString()
            };

            return model;
        }

        public override MySqlCommand CreateQueryAdd(MySqlConnection conn, BaseModel model)
        {
            LoaiSanPham currentModel = (LoaiSanPham)model;
            String query = "INSERT INTO LOAI_SAN_PHAM (ID_LOAISP,TEN) VALUES (@ID_LOAISP,@TEN)";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_LOAISP", currentModel.IdLoaiSP);
            mySqlCommand.Parameters.AddWithValue("TEN", currentModel.Ten);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryDelete(MySqlConnection conn, BaseModel model)
        {
            LoaiSanPham currentModel = (LoaiSanPham)model;
            String query = "DELETE FROM LOAI_SAN_PHAM WHERE  BAN.ID_LOAISP = @ID_LOAISP ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_LOAISP", currentModel.IdLoaiSP);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryEdit(MySqlConnection conn, BaseModel oldmodel, BaseModel newmodel)
        {
            LoaiSanPham oldcurrentModel = (LoaiSanPham)oldmodel;
            LoaiSanPham newcurrentModel = (LoaiSanPham)newmodel;
            String query = "UPDATE LOAI_SAN_PHAM SET @ID_LOAISP,@TEN WHERE  BAN.ID_LOAISP = @OLD_ID_LOAISP ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_LOAISP", newcurrentModel.IdLoaiSP);
            mySqlCommand.Parameters.AddWithValue("TEN", newcurrentModel.Ten);
            mySqlCommand.Parameters.AddWithValue("OLD_ID_LOAISP", oldcurrentModel.IdLoaiSP);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryFind(MySqlConnection conn, BaseModel model)
        {
            LoaiSanPham currentModel = (LoaiSanPham)model;

            String query = "SELECT FROM LOAI_SAN_PHAM WHERE 1=1 ";
            if (currentModel.IdLoaiSP >= 0) query += " AND LOAI_SAN_PHAM.ID_LOAISP = @ID_LOAISP ";
            if (currentModel.Ten != null) query += " AND LOAI_SAN_PHAM.TEN = @TEN ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            if (currentModel.IdLoaiSP >= 0) mySqlCommand.Parameters.AddWithValue("ID_LOAISP", currentModel.IdLoaiSP);
            if (currentModel.Ten != null) mySqlCommand.Parameters.AddWithValue("TEN", currentModel.Ten);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryGetAll(MySqlConnection conn)
        {
            String query = "SELECT * FROM LOAI_SAN_PHAM";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);

            return mySqlCommand;
        }

    }
}

