import { DataTypes, Model } from "sequelize";
import connection from "../../config/database";
import { IUserModel } from "../interfaces/models/IUserModel";

class User extends Model implements IUserModel{
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public phone!: string;
    public image_url?: string;
    public state?: number;
}

User.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name:{
            type: DataTypes.STRING(100)
        },
        email:{
            type: DataTypes.STRING(150)
        },
        password:{
            type: DataTypes.STRING
        },
        phone:{
            type: DataTypes.CHAR(9)
        },
        image_url:{
            type: DataTypes.STRING
        },
        state:{
            type: DataTypes.TINYINT,
            defaultValue: 1
        }
    },{
        sequelize: connection,
        modelName: 'user',
        timestamps: false
    }
);

export default User;