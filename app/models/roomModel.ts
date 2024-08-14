import { DataTypes, Model } from "sequelize";
import connection from "../../config/database";
import RoomType from "./roomTypeModel";

class Room extends Model {}

Room.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        room_type: {
            type: DataTypes.BIGINT.UNSIGNED,
            references: {
                model: RoomType,
                key: 'id'
            },
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(80),
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
        modelName: 'room',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)

export default Room;