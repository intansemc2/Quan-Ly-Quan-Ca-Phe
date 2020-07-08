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
                Ten = reader["TEN"].ToString(),
                GhiChu = reader["GHI_CHU"].ToString(),
                LinkAnh = reader["LINK_ANH"].ToString()
            };

            return model;
        }

        public override BaseModel ConvertReaderToModelGetAll(MySqlDataReader reader)
        {
            BaseModel model = new LoaiSanPham()
            {
                IdLoaiSP = Convert.ToInt32(reader["ID_LOAISP"].ToString()),
                Ten = reader["TEN"].ToString(),
                GhiChu = reader["GHI_CHU"].ToString(),
                LinkAnh = reader["LINK_ANH"].ToString()
            };

            return model;
        }

        public override MySqlCommand CreateQueryAdd(MySqlConnection conn, BaseModel model)
        {
            LoaiSanPham currentModel = (LoaiSanPham)model;
            String query = "INSERT INTO loai_san_pham (ID_LOAISP,TEN,GHI_CHU,LINK_ANH) VALUES (@ID_LOAISP,@TEN,@GHI_CHU,@LINK_ANH)";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_LOAISP", currentModel.IdLoaiSP);
            mySqlCommand.Parameters.AddWithValue("TEN", currentModel.Ten);
            mySqlCommand.Parameters.AddWithValue("GHI_CHU", currentModel.GhiChu);
            mySqlCommand.Parameters.AddWithValue("LINK_ANH", currentModel.LinkAnh);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryDelete(MySqlConnection conn, BaseModel model)
        {
            LoaiSanPham currentModel = (LoaiSanPham)model;
            String query = "DELETE FROM loai_san_pham WHERE  loai_san_pham.ID_LOAISP = @ID_LOAISP ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_LOAISP", currentModel.IdLoaiSP);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryDeleteAll(MySqlConnection conn)
        {
            String query = "DELETE FROM loai_san_pham";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryEdit(MySqlConnection conn, BaseModel oldmodel, BaseModel newmodel)
        {
            LoaiSanPham oldcurrentModel = (LoaiSanPham)oldmodel;
            LoaiSanPham newcurrentModel = (LoaiSanPham)newmodel;
            String query = "UPDATE loai_san_pham SET ID_LOAISP = @ID_LOAISP,TEN = @TEN,GHI_CHU = @GHI_CHU,LINK_ANH = @LINK_ANH WHERE  loai_san_pham.ID_LOAISP = @OLD_ID_LOAISP ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_LOAISP", newcurrentModel.IdLoaiSP);
            mySqlCommand.Parameters.AddWithValue("TEN", newcurrentModel.Ten);
            mySqlCommand.Parameters.AddWithValue("GHI_CHU", newcurrentModel.GhiChu);
            mySqlCommand.Parameters.AddWithValue("LINK_ANH", newcurrentModel.LinkAnh);
            mySqlCommand.Parameters.AddWithValue("OLD_ID_LOAISP", oldcurrentModel.IdLoaiSP);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryFind(MySqlConnection conn, BaseModel model)
        {
            LoaiSanPham currentModel = (LoaiSanPham)model;

            String query = "SELECT * FROM loai_san_pham WHERE 1=1 ";
            if (currentModel.IdLoaiSP >= 0) query += " AND loai_san_pham.ID_LOAISP = @ID_LOAISP ";
            if (currentModel.Ten != null) query += " AND loai_san_pham.TEN = @TEN ";
            if (currentModel.GhiChu != null) query += " AND loai_san_pham.GHI_CHU = @GHI_CHU ";
            if (currentModel.LinkAnh != null) query += " AND loai_san_pham.LINK_ANH = @LINK_ANH ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            if (currentModel.IdLoaiSP >= 0) mySqlCommand.Parameters.AddWithValue("ID_LOAISP", currentModel.IdLoaiSP);
            if (currentModel.Ten != null) mySqlCommand.Parameters.AddWithValue("TEN", currentModel.Ten);
            if (currentModel.GhiChu != null) mySqlCommand.Parameters.AddWithValue("GHI_CHU", currentModel.GhiChu);            
            if (currentModel.LinkAnh != null) mySqlCommand.Parameters.AddWithValue("LINK_ANH", currentModel.LinkAnh);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryGetAll(MySqlConnection conn)
        {
            String query = "SELECT * FROM loai_san_pham";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);

            return mySqlCommand;
        }

    }
}

