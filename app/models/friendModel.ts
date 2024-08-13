import { DataTypes, Model } from "sequelize";
import connection from "../../config/database";
import User from "./userModel";

class Friend extends Model {}

Friend.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        user1_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            references: {
                model: User,
                key: 'id'
            },
            allowNull: false
        },
        user2_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            references: {
                model: User,
                key: 'id'
            },
            allowNull: false
        },
        state: {
            type: DataTypes.TINYINT,
            defaultValue: 1,
            allowNull: false
        }
    },
    {
        sequelize: connection,
        modelName: 'friend'
    }
);

export default Friend;