import { DataTypes, Model } from "sequelize";
import connection from "../../config/database";
import User from "./userModel";

class Friend extends Model {
    public id!: number;
    public user_id!: number;
    public friend_id!:number;
    public state?: boolean;
}

Friend.init(
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
        state: {
            type: DataTypes.TINYINT,
            defaultValue: 1,
            allowNull: false,
        }
    },
    {
        sequelize: connection,
        modelName: 'friend',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

export default Friend;