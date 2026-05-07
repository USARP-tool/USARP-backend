const { Model, DataTypes } = require("sequelize");

class Project extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "creatorId",
      as: "creator",
      onDelete: "CASCADE",
    });

    this.belongsToMany(models.User, {
      through: "ProjectUser",
      foreignKey: "projectId",
      as: "members",
    });

    this.hasMany(models.UserStories, {
      foreignKey: "projectId",
      as: "userStories",
      onDelete: "CASCADE",
    });
  }

  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
          unique: true,
        },
        projectName: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            notNull: {
              msg: "O nome do projeto não pode ser vazio",
            },
            notEmpty: {
              msg: "O nome do projeto não pode ser vazio",
            },
            len(value) {
              if (value && value.trim().length < 5) {
                throw new Error(
                  "O nome do projeto deve ter pelo menos 5 caracteres",
                );
              }
            },
            containsInvalidCharacters(value) {
              if (
                value &&
                value.trim().length > 5 &&
                !/^[\p{L}0-9!@#$%^&*ç()_\-+=[\]{}\\|:;'"<> ]+$/iu.test(value)
              ) {
                throw new Error(
                  "O nome do projeto contém caracteres inválidos",
                );
              }
            },
          },
          set(value) {
            this.setDataValue("projectName", value.trim());
          },
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
          validate: {
            len(value) {
              if (
                typeof value === "string" &&
                value.trim().length > 0 &&
                value.trim().length < 5
              ) {
                throw new Error("A descrição deve ter pelo menos 5 caracteres");
              }
            },
            containsInvalidCharacters(value) {
              if (
                typeof value === "string" &&
                value.trim().length > 5 &&
                !/^[\p{L}0-9!@#$%^&*ç()_\-+=[\]{}\\|:;"'<> ]+$/iu.test(
                  value.trim(),
                )
              ) {
                throw new Error("A descrição contém caracteres inválidos");
              }
            },
          },
          set(value) {
            this.setDataValue(
              "description",
              typeof value === "string" && value.trim().length > 0
                ? value.trim()
                : null,
            );
          },
        },
        creatorId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        status: {
          type: DataTypes.ENUM("Ativo", "Bloqueado", "Concluído/Encerrado"),
          allowNull: true,
          defaultValue: "Ativo",
          validate: {
            isIn: {
              args: [["Ativo", "Bloqueado", "Concluído/Encerrado"]],
              msg: "Status deve ser 'Ativo', 'Bloqueado' ou 'Concluído/Encerrado'.",
            },
          },
        },
      },
      {
        sequelize,
        modelName: "Project",
        tableName: "projects",
      },
    );
  }
}

module.exports = Project;
