import { DataTypes, Model } from "sequelize";
import connection from "../../config/database";
import User from "./userModel";
import Room from "./roomModel";

class Message extends Model {}

Message.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            references: {
                model: User,
                key: 'id'
            },
            allowNull: false
        },
        room_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            references: {
                model: Room,
                key: 'id'
            },
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
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
        modelName: 'message'
    }
);

export default Message;