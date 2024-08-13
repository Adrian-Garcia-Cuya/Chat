import { DataTypes, Model } from "sequelize";
import connection from "../../config/database";
import User from "./userModel";

class Nickname extends Model {}

Nickname.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            references: {
                model: User,
                key: 'id'
            },
            allowNull: false
        },
        friend_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            references: {
                model: User,
                key: 'id'
            },
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false
        }
    },
    {
        sequelize: connection,
        modelName: 'nickname'
    }
);

export default Nickname;