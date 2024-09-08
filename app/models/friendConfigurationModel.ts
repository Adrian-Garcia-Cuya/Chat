import { DataTypes, Model } from "sequelize";
import connection from "../../config/database";
import Friend from "./friendModel";

class FriendConfiguration  extends Model {}

FriendConfiguration.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        friend_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            references: {
                model: Friend,
                key: 'id'
            },
            allowNull: false
        },
        nickname: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        block: {
            type: DataTypes.TINYINT,
            defaultValue: 2,
            allowNull: false
        }
    },
    {
        sequelize: connection,
        modelName: 'friends_configuration',
        timestamps: false
    }
);

export default FriendConfiguration;