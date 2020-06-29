using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class CtkmStoreContext : BaseStoreContext
    {

        public override BaseModel ConvertReaderToModelFind(MySqlDataReader reader)
        {
            BaseModel model = new Ctkm()
            {
                IdKhuyenMai = Convert.ToInt32(reader["ID_KHUYEN_MAI"].ToString()),
                IdSanPham = Convert.ToInt32(reader["ID_SAN_PHAM"].ToString()),
                SoLuong = Convert.ToInt32(reader["SO_LUONG"].ToString()),
                DonGia = Convert.ToInt32(reader["DON_GIA"].ToString()),
                DiemTichLuy = Convert.ToInt32(reader["DIEM_TICH_LUY"].ToString())
            };

            return model;
        }

        public override BaseModel ConvertReaderToModelGetAll(MySqlDataReader reader)
        {
            BaseModel model = new Ctkm()
            {
                IdKhuyenMai = Convert.ToInt32(reader["ID_KHUYEN_MAI"].ToString()),
                IdSanPham = Convert.ToInt32(reader["ID_SAN_PHAM"].ToString()),
                SoLuong = Convert.ToInt32(reader["SO_LUONG"].ToString()),
                DonGia = Convert.ToInt32(reader["DON_GIA"].ToString()),
                DiemTichLuy = Convert.ToInt32(reader["DIEM_TICH_LUY"].ToString())
            };

            return model;
        }

        public override MySqlCommand CreateQueryAdd(MySqlConnection conn, BaseModel model)
        {
            Ctkm currentModel = (Ctkm)model;
            String query = "INSERT INTO ctkm (ID_KHUYEN_MAI,ID_SAN_PHAM,SO_LUONG,DON_GIA,DIEM_TICH_LUY) VALUES (@ID_KHUYEN_MAI,@ID_SAN_PHAM,@SO_LUONG,@DON_GIA,@DIEM_TICH_LUY)";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_KHUYEN_MAI", currentModel.IdKhuyenMai);
            mySqlCommand.Parameters.AddWithValue("ID_SAN_PHAM", currentModel.IdSanPham);
            mySqlCommand.Parameters.AddWithValue("SO_LUONG", currentModel.SoLuong);
            mySqlCommand.Parameters.AddWithValue("DON_GIA", currentModel.DonGia);
            mySqlCommand.Parameters.AddWithValue("DIEM_TICH_LUY", currentModel.DiemTichLuy);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryDelete(MySqlConnection conn, BaseModel model)
        {
            Ctkm currentModel = (Ctkm)model;
            String query = "DELETE FROM ctkm WHERE  ctkm.ID_KHUYEN_MAI = @ID_KHUYEN_MAI  AND  ctkm.ID_SAN_PHAM = @ID_SAN_PHAM ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_KHUYEN_MAI", currentModel.IdKhuyenMai);
            mySqlCommand.Parameters.AddWithValue("ID_SAN_PHAM", currentModel.IdSanPham);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryDeleteAll(MySqlConnection conn)
        {
            String query = "DELETE FROM ctkm";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryEdit(MySqlConnection conn, BaseModel oldmodel, BaseModel newmodel)
        {
            Ctkm oldcurrentModel = (Ctkm)oldmodel;
            Ctkm newcurrentModel = (Ctkm)newmodel;
            String query = "UPDATE ctkm SET ID_KHUYEN_MAI = @ID_KHUYEN_MAI,ID_SAN_PHAM = @ID_SAN_PHAM,SO_LUONG = @SO_LUONG,DON_GIA = @DON_GIA,DIEM_TICH_LUY = @DIEM_TICH_LUY WHERE  ctkm.ID_KHUYEN_MAI = @OLD_ID_KHUYEN_MAI  AND  ctkm.ID_SAN_PHAM = @OLD_ID_SAN_PHAM ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_KHUYEN_MAI", newcurrentModel.IdKhuyenMai);
            mySqlCommand.Parameters.AddWithValue("ID_SAN_PHAM", newcurrentModel.IdSanPham);
            mySqlCommand.Parameters.AddWithValue("SO_LUONG", newcurrentModel.SoLuong);
            mySqlCommand.Parameters.AddWithValue("DON_GIA", newcurrentModel.DonGia);
            mySqlCommand.Parameters.AddWithValue("DIEM_TICH_LUY", newcurrentModel.DiemTichLuy);
            mySqlCommand.Parameters.AddWithValue("OLD_ID_KHUYEN_MAI", oldcurrentModel.IdKhuyenMai);
            mySqlCommand.Parameters.AddWithValue("OLD_ID_SAN_PHAM", oldcurrentModel.IdSanPham);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryFind(MySqlConnection conn, BaseModel model)
        {
            Ctkm currentModel = (Ctkm)model;

            String query = "SELECT * FROM ctkm WHERE 1=1 ";
            if (currentModel.IdKhuyenMai >= 0) query += " AND ctkm.ID_KHUYEN_MAI = @ID_KHUYEN_MAI ";
            if (currentModel.IdSanPham >= 0) query += " AND ctkm.ID_SAN_PHAM = @ID_SAN_PHAM ";
            if (currentModel.SoLuong >= 0) query += " AND ctkm.SO_LUONG = @SO_LUONG ";
            if (currentModel.DonGia >= 0) query += " AND ctkm.DON_GIA = @DON_GIA ";
            if (currentModel.DiemTichLuy >= 0) query += " AND ctkm.DIEM_TICH_LUY = @DIEM_TICH_LUY ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            if (currentModel.IdKhuyenMai >= 0) mySqlCommand.Parameters.AddWithValue("ID_KHUYEN_MAI", currentModel.IdKhuyenMai);
            if (currentModel.IdSanPham >= 0) mySqlCommand.Parameters.AddWithValue("ID_SAN_PHAM", currentModel.IdSanPham);
            if (currentModel.SoLuong >= 0) mySqlCommand.Parameters.AddWithValue("SO_LUONG", currentModel.SoLuong);
            if (currentModel.DonGia >= 0) mySqlCommand.Parameters.AddWithValue("DON_GIA", currentModel.DonGia);
            if (currentModel.DiemTichLuy >= 0) mySqlCommand.Parameters.AddWithValue("DIEM_TICH_LUY", currentModel.DiemTichLuy);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryGetAll(MySqlConnection conn)
        {
            String query = "SELECT * FROM ctkm";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);

            return mySqlCommand;
        }

    }
}

