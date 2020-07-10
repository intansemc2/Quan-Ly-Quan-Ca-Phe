using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class HoaDonStoreContext : BaseStoreContext
    {

        public override BaseModel ConvertReaderToModelFind(MySqlDataReader reader)
        {
            BaseModel model = new HoaDon()
            {
                IdHoaDon = Convert.ToInt32(reader["ID_HOA_DON"].ToString()),
                IdKhachHang = Convert.ToInt32(reader["ID_KHACH_HANG"].ToString()),
                IdBan = Convert.ToInt32(reader["ID_BAN"].ToString()),
                IdNhanVien = Convert.ToInt32(reader["ID_NHAN_VIEN"].ToString()),
                ThoiGianLap = reader["THOI_GIAN_LAP"].ToString(),
                ThoiGianThanhToan = reader["THOI_GIAN_THANH_TOAN"].ToString(),
                PhanTramTichLuy = (float)Convert.ToDouble(reader["PHAN_TRAM_TICH_LUY"].ToString()),
                SoLuongDiemDoi = Convert.ToInt32(reader["SO_LUONG_DIEM_DOI"].ToString()),
                TyGiaDiemDoi = (float)Convert.ToDouble(reader["TY_GIA_DIEM_DOI"].ToString())
            };

            return model;
        }

        public override BaseModel ConvertReaderToModelGetAll(MySqlDataReader reader)
        {
            BaseModel model = new HoaDon()
            {
                IdHoaDon = Convert.ToInt32(reader["ID_HOA_DON"].ToString()),
                IdKhachHang = Convert.ToInt32(reader["ID_KHACH_HANG"].ToString()),
                IdBan = Convert.ToInt32(reader["ID_BAN"].ToString()),
                IdNhanVien = Convert.ToInt32(reader["ID_NHAN_VIEN"].ToString()),
                ThoiGianLap = reader["THOI_GIAN_LAP"].ToString(),
                ThoiGianThanhToan = reader["THOI_GIAN_THANH_TOAN"].ToString(),
                PhanTramTichLuy = (float)Convert.ToDouble(reader["PHAN_TRAM_TICH_LUY"].ToString()),
                SoLuongDiemDoi = Convert.ToInt32(reader["SO_LUONG_DIEM_DOI"].ToString()),
                TyGiaDiemDoi = (float)Convert.ToDouble(reader["TY_GIA_DIEM_DOI"].ToString())
            };

            return model;
        }

        public override MySqlCommand CreateQueryAdd(MySqlConnection conn, BaseModel model)
        {
            HoaDon currentModel = (HoaDon)model;
            String query = "INSERT INTO hoa_don (ID_HOA_DON,ID_KHACH_HANG,ID_BAN,ID_NHAN_VIEN,THOI_GIAN_LAP,THOI_GIAN_THANH_TOAN,PHAN_TRAM_TICH_LUY,SO_LUONG_DIEM_DOI,TY_GIA_DIEM_DOI) VALUES (@ID_HOA_DON,@ID_KHACH_HANG,@ID_BAN,@ID_NHAN_VIEN,@THOI_GIAN_LAP,@THOI_GIAN_THANH_TOAN,@PHAN_TRAM_TICH_LUY,@SO_LUONG_DIEM_DOI,@TY_GIA_DIEM_DOI)";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_HOA_DON", currentModel.IdHoaDon);
            mySqlCommand.Parameters.AddWithValue("ID_KHACH_HANG", currentModel.IdKhachHang);
            mySqlCommand.Parameters.AddWithValue("ID_BAN", currentModel.IdBan);
            mySqlCommand.Parameters.AddWithValue("ID_NHAN_VIEN", currentModel.IdNhanVien);
            mySqlCommand.Parameters.AddWithValue("THOI_GIAN_LAP", currentModel.ThoiGianLap);
            mySqlCommand.Parameters.AddWithValue("THOI_GIAN_THANH_TOAN", currentModel.ThoiGianThanhToan);
            mySqlCommand.Parameters.AddWithValue("PHAN_TRAM_TICH_LUY", currentModel.PhanTramTichLuy);
            mySqlCommand.Parameters.AddWithValue("SO_LUONG_DIEM_DOI", currentModel.SoLuongDiemDoi);
            mySqlCommand.Parameters.AddWithValue("TY_GIA_DIEM_DOI", currentModel.TyGiaDiemDoi);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryDelete(MySqlConnection conn, BaseModel model)
        {
            HoaDon currentModel = (HoaDon)model;
            String query = "DELETE FROM hoa_don WHERE  hoa_don.ID_HOA_DON = @ID_HOA_DON ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_HOA_DON", currentModel.IdHoaDon);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryDeleteAll(MySqlConnection conn)
        {
            String query = "DELETE FROM hoa_don";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryEdit(MySqlConnection conn, BaseModel oldmodel, BaseModel newmodel)
        {
            HoaDon oldcurrentModel = (HoaDon)oldmodel;
            HoaDon newcurrentModel = (HoaDon)newmodel;
            String query = "UPDATE hoa_don SET ID_HOA_DON = @ID_HOA_DON,ID_KHACH_HANG = @ID_KHACH_HANG,ID_BAN = @ID_BAN,ID_NHAN_VIEN = @ID_NHAN_VIEN,THOI_GIAN_LAP = @THOI_GIAN_LAP,THOI_GIAN_THANH_TOAN = @THOI_GIAN_THANH_TOAN,PHAN_TRAM_TICH_LUY = @PHAN_TRAM_TICH_LUY,SO_LUONG_DIEM_DOI = @SO_LUONG_DIEM_DOI,TY_GIA_DIEM_DOI = @TY_GIA_DIEM_DOI WHERE  hoa_don.ID_HOA_DON = @OLD_ID_HOA_DON ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_HOA_DON", newcurrentModel.IdHoaDon);
            mySqlCommand.Parameters.AddWithValue("ID_KHACH_HANG", newcurrentModel.IdKhachHang);
            mySqlCommand.Parameters.AddWithValue("ID_BAN", newcurrentModel.IdBan);
            mySqlCommand.Parameters.AddWithValue("ID_NHAN_VIEN", newcurrentModel.IdNhanVien);
            mySqlCommand.Parameters.AddWithValue("THOI_GIAN_LAP", newcurrentModel.ThoiGianLap);
            mySqlCommand.Parameters.AddWithValue("THOI_GIAN_THANH_TOAN", newcurrentModel.ThoiGianLap);
            mySqlCommand.Parameters.AddWithValue("PHAN_TRAM_TICH_LUY", newcurrentModel.PhanTramTichLuy);
            mySqlCommand.Parameters.AddWithValue("SO_LUONG_DIEM_DOI", newcurrentModel.SoLuongDiemDoi);
            mySqlCommand.Parameters.AddWithValue("TY_GIA_DIEM_DOI", newcurrentModel.TyGiaDiemDoi);
            mySqlCommand.Parameters.AddWithValue("OLD_ID_HOA_DON", oldcurrentModel.IdHoaDon);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryFind(MySqlConnection conn, BaseModel model)
        {
            HoaDon currentModel = (HoaDon)model;

            String query = "SELECT * FROM hoa_don WHERE 1=1 ";
            if (currentModel.IdHoaDon >= 0) query += " AND hoa_don.ID_HOA_DON = @ID_HOA_DON ";
            if (currentModel.IdKhachHang >= 0) query += " AND hoa_don.ID_KHACH_HANG = @ID_KHACH_HANG ";
            if (currentModel.IdBan >= 0) query += " AND hoa_don.ID_BAN = @ID_BAN ";
            if (currentModel.IdNhanVien >= 0) query += " AND hoa_don.ID_NHAN_VIEN = @ID_NHAN_VIEN ";
            if (currentModel.ThoiGianLap != null) query += " AND hoa_don.THOI_GIAN_LAP = @THOI_GIAN_LAP ";
            if (currentModel.ThoiGianThanhToan != null) query += " AND hoa_don.THOI_GIAN_THANH_TOAN = @THOI_GIAN_THANH_TOAN ";
            //if (currentModel.PhanTramTichLuy >= 0) query += " AND hoa_don.PHAN_TRAM_TICH_LUY = @PHAN_TRAM_TICH_LUY ";
            if (currentModel.SoLuongDiemDoi >= 0) query += " AND hoa_don.SO_LUONG_DIEM_DOI = @SO_LUONG_DIEM_DOI ";
            //if (currentModel.TyGiaDiemDoi >= 0) query += " AND hoa_don.TY_GIA_DIEM_DOI = @TY_GIA_DIEM_DOI ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            if (currentModel.IdHoaDon >= 0) mySqlCommand.Parameters.AddWithValue("ID_HOA_DON", currentModel.IdHoaDon);
            if (currentModel.IdKhachHang >= 0) mySqlCommand.Parameters.AddWithValue("ID_KHACH_HANG", currentModel.IdKhachHang);
            if (currentModel.IdBan >= 0) mySqlCommand.Parameters.AddWithValue("ID_BAN", currentModel.IdBan);
            if (currentModel.IdNhanVien >= 0) mySqlCommand.Parameters.AddWithValue("ID_NHAN_VIEN", currentModel.IdNhanVien);
            if (currentModel.ThoiGianLap != null) mySqlCommand.Parameters.AddWithValue("THOI_GIAN_LAP", currentModel.ThoiGianLap);
            if (currentModel.ThoiGianThanhToan != null) mySqlCommand.Parameters.AddWithValue("THOI_GIAN_THANH_TOAN", currentModel.ThoiGianThanhToan);
            //if (currentModel.PhanTramTichLuy >= 0) mySqlCommand.Parameters.AddWithValue("PHAN_TRAM_TICH_LUY", currentModel.PhanTramTichLuy);
            if (currentModel.SoLuongDiemDoi >= 0) mySqlCommand.Parameters.AddWithValue("SO_LUONG_DIEM_DOI", currentModel.SoLuongDiemDoi);
            //if (currentModel.TyGiaDiemDoi >= 0) mySqlCommand.Parameters.AddWithValue("TY_GIA_DIEM_DOI", currentModel.TyGiaDiemDoi);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryGetAll(MySqlConnection conn)
        {
            String query = "SELECT * FROM hoa_don";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);

            return mySqlCommand;
        }

    }
}

