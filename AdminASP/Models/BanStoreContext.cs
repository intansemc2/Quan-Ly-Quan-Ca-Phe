using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class BanStoreContext : BaseStoreContext
    {

        public override BaseModel ConvertReaderToModelFind(MySqlDataReader reader)
        {
            BaseModel model = new Ban()
            {
                IdBan = Convert.ToInt32(reader["ID_BAN"].ToString()),
                Ten = reader["TEN"].ToString(),

            };
            return model;
        }

        public override BaseModel ConvertReaderToModelGetAll(MySqlDataReader reader)
        {
            BaseModel model = new Ban()
            {
                IdBan = Convert.ToInt32(reader["ID_BAN"].ToString()),
                Ten = reader["TEN"].ToString(),
            };

            return model;
        }

        public override MySqlCommand CreateQueryAdd(MySqlConnection conn, BaseModel model)
        {
            Ban currentModel = (Ban)model;
            String query = "INSERT INTO ban (TEN) VALUES (@TEN)";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("TEN", currentModel.Ten);
            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryDelete(MySqlConnection conn, BaseModel model)
        {
            Ban currentModel = (Ban)model;
            String query = "DELETE FROM ban WHERE  ban.ID_BAN = @ID_BAN ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_BAN", currentModel.IdBan);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryDeleteAll(MySqlConnection conn)
        {
            String query = "DELETE FROM ban";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryEdit(MySqlConnection conn, BaseModel oldmodel, BaseModel newmodel)
        {
            Ban oldcurrentModel = (Ban)oldmodel;
            Ban newcurrentModel = (Ban)newmodel;
            String query = "UPDATE ban SET ID_BAN = @ID_BAN,ban.TEN = @TEN WHERE ban.ID_BAN = @OLD_ID_BAN ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            mySqlCommand.Parameters.AddWithValue("ID_BAN", newcurrentModel.IdBan);
            mySqlCommand.Parameters.AddWithValue("TEN", newcurrentModel.Ten);

            mySqlCommand.Parameters.AddWithValue("OLD_ID_BAN", oldcurrentModel.IdBan);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryFind(MySqlConnection conn, BaseModel model)
        {
            Ban currentModel = (Ban)model;

            String query = "SELECT * FROM ban WHERE 1=1 ";
            if (currentModel.IdBan >= 0) query += " AND ban.ID_BAN = @ID_BAN ";
            if (currentModel.Ten != null) query += " AND ban.TEN = @TEN ";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);
            if (currentModel.IdBan >= 0) mySqlCommand.Parameters.AddWithValue("ID_BAN", currentModel.IdBan);
            if (currentModel.Ten != null) mySqlCommand.Parameters.AddWithValue("TEN", currentModel.Ten);

            return mySqlCommand;
        }

        public override MySqlCommand CreateQueryGetAll(MySqlConnection conn)
        {
            String query = "SELECT ban.ID_BAN, ban.TEN FROM ban";

            MySqlCommand mySqlCommand = new MySqlCommand(query, conn);

            return mySqlCommand;
        }

    }
}

