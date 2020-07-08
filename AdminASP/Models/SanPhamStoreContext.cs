using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class SanPhamStoreContext : BaseStoreContext
    {

        public override BaseModel ConvertReaderToModelFind(MySqlDataReader reader)
        {
            BaseModel model = new SanPham()
            {
                IdSanPham = Convert.ToInt32(reader["ID_SAN_PHAM"].ToString()),
                IdLoaiSP = Convert.ToInt32(reader["ID_LOAISP"].ToString()),
                Ten = reader["TEN"].ToString(),
                Gia = Convert.ToInt32(reader["GIA"].ToString()),
                DiemTichLuy = Convert.ToInt32(reader["DIEM_TICH_LUY"].ToString()),
                GhiChu = reader["GHI_CHU"].ToString(),
                LinkAnh = reader["LINK_ANH"].ToString()
            };

            return model;
        }

        public override BaseModel ConvertReaderToModelGetAll(MySqlDataReader reader)
        {
            BaseModel model = new SanPham()
            {
                IdSanPham = Convert.ToInt32(reader["ID_SAN_PHAM"].ToString()),
                IdLoaiSP = Convert.ToInt32(reader["ID_LOAISP"].ToString()),
                Ten = reader["TEN"].ToString(),
                Gia = Convert.ToInt32(reader["GIA"].ToString()),
                DiemTichLuy = Convert.ToInt32(reader["DIEM_TICH_LUY"].ToString()),
                GhiChu = reader["GHI_CHU"].ToString(),
                LinkAnh = reader["LINK_ANH"].ToString()
            };

            return model;
        }

        public override MySqlCommand CreateQueryAdd(MySqlConnection conn, BaseModel model)
        {
            SanPham currentModel = (SanPham)model;
            String query = "INSERT INTO san_pham (ID_SAN_PHAM,ID_LOAISP,TEN,GIA,DIEM_TICH_LUY,GHI_CHU, LINK_ANH) VALUES (@ID_SAN_PHAM,@ID_LOAISP,@TEN,@GIA,@DIEM_TICH_LUY,@GHI_CHU, @LINK_ANH)";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_SAN_PHAM", currentModel.IdSanPham);
            mySqlCommand.Parameters.AddWithValue("ID_LOAISP", currentModel.IdLoaiSP);
            mySqlCommand.Parameters.AddWithValue("TEN", currentModel.Ten);
            mySqlCommand.Parameters.AddWithValue("GIA", currentModel.Gia);
            mySqlCommand.Parameters.AddWithValue("DIEM_TICH_LUY", currentModel.DiemTichLuy);
            mySqlCommand.Parameters.AddWithValue("GHI_CHU", currentModel.GhiChu);
            mySqlCommand.Parameters.AddWithValue("LINK_ANH", currentModel.LinkAnh);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryDelete(MySqlConnection conn, BaseModel model)
        {
            SanPham currentModel = (SanPham)model;
            String query = "DELETE FROM san_pham WHERE  san_pham.ID_SAN_PHAM = @ID_SAN_PHAM ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_SAN_PHAM", currentModel.IdSanPham);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryDeleteAll(MySqlConnection conn)
        {
            String query = "DELETE FROM san_pham";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryEdit(MySqlConnection conn, BaseModel oldmodel, BaseModel newmodel)
        {
            SanPham oldcurrentModel = (SanPham)oldmodel;
            SanPham newcurrentModel = (SanPham)newmodel;
            String query = "UPDATE san_pham SET ID_SAN_PHAM = @ID_SAN_PHAM,ID_LOAISP = @ID_LOAISP,TEN = @TEN,GIA = @GIA,DIEM_TICH_LUY = @DIEM_TICH_LUY,GHI_CHU = @GHI_CHU, LINK_ANH = @LINK_ANH WHERE  san_pham.ID_SAN_PHAM = @OLD_ID_SAN_PHAM";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_SAN_PHAM", newcurrentModel.IdSanPham);
            mySqlCommand.Parameters.AddWithValue("ID_LOAISP", newcurrentModel.IdLoaiSP);
            mySqlCommand.Parameters.AddWithValue("TEN", newcurrentModel.Ten);
            mySqlCommand.Parameters.AddWithValue("GIA", newcurrentModel.Gia);
            mySqlCommand.Parameters.AddWithValue("DIEM_TICH_LUY", newcurrentModel.DiemTichLuy);
            mySqlCommand.Parameters.AddWithValue("GHI_CHU", newcurrentModel.GhiChu);
            mySqlCommand.Parameters.AddWithValue("LINK_ANH", newcurrentModel.GhiChu);
            mySqlCommand.Parameters.AddWithValue("OLD_ID_SAN_PHAM", oldcurrentModel.IdSanPham);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryFind(MySqlConnection conn, BaseModel model)
        {
            SanPham currentModel = (SanPham)model;

            String query = "SELECT * FROM san_pham WHERE 1=1 ";
            if (currentModel.IdSanPham >= 0) query += " AND san_pham.ID_SAN_PHAM = @ID_SAN_PHAM ";
            if (currentModel.IdLoaiSP >= 0) query += " AND san_pham.ID_LOAISP = @ID_LOAISP ";
            if (currentModel.Ten != null) query += " AND san_pham.TEN = @TEN ";
            if (currentModel.Gia >= 0) query += " AND san_pham.GIA = @GIA ";
            if (currentModel.DiemTichLuy >= 0) query += " AND san_pham.DIEM_TICH_LUY = @DIEM_TICH_LUY ";
            if (currentModel.GhiChu != null) query += " AND san_pham.GHI_CHU = @GHI_CHU ";
            if (currentModel.LinkAnh != null) query += " AND san_pham.LINK_ANH = @LINK_ANH ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            if (currentModel.IdSanPham >= 0) mySqlCommand.Parameters.AddWithValue("ID_SAN_PHAM", currentModel.IdSanPham);
            if (currentModel.IdLoaiSP >= 0) mySqlCommand.Parameters.AddWithValue("ID_LOAISP", currentModel.IdLoaiSP);
            if (currentModel.Ten != null) mySqlCommand.Parameters.AddWithValue("TEN", currentModel.Ten);
            if (currentModel.Gia >= 0) mySqlCommand.Parameters.AddWithValue("GIA", currentModel.Gia);
            if (currentModel.DiemTichLuy >= 0) mySqlCommand.Parameters.AddWithValue("DIEM_TICH_LUY", currentModel.DiemTichLuy);
            if (currentModel.GhiChu != null) mySqlCommand.Parameters.AddWithValue("GHI_CHU", currentModel.GhiChu);
            if (currentModel.GhiChu != null) mySqlCommand.Parameters.AddWithValue("LINK_ANH", currentModel.LinkAnh);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryGetAll(MySqlConnection conn)
        {
            String query = "SELECT * FROM san_pham";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);

            return mySqlCommand;
        }

    }
}

