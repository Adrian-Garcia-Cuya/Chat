import { DataTypes, Model } from "sequelize";
import connection from "../../config/database";

class RoomType extends Model {}

RoomType.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(80),
            allowNull: false
        }
    },
    {
        sequelize: connection,
        modelName: 'room_type',
        timestamps: false
    }
)

export default RoomType;