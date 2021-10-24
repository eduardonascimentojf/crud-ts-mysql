import * as express from "express";
import prismaClient from "../prisma";

export const userRoute = (app: express.Application) => {
  app
    .route("/users/:id?")
    .get(async (req, res) => {
      const User_id = req.params.id;
      if (User_id) {
        await prismaClient.user
          .findFirst({
            where: {
              id: User_id,
            },
          })
          .then((user) => {
            if (user) {
              return res.status(200).json({
                users: user,
              });
            } else {
              return res.status(500).json({
                message: "Nenhum usuario encontrado",
              });
            }
          })
          .catch((error) => {
            return res.status(500).json({
              message: "Erro no nosso sistema encontrado",
              error: error,
            });
          });
      } else {
        await prismaClient.user
          .findMany()
          .then((users) => {
            if (users) {
              return res.status(200).json({
                message: "Todos os usuarios",
                users: users,
                count: users.length,
              });
            } else {
              return res.status(500).json({
                message: "Nenhum usuario cadastrado",
              });
            }
          })
          .catch((error) => {
            return res.status(500).json({
              message: "Erro ao listar usuarios",
              error: error,
            });
          });
      }
    })
    .post(async (req, res) => {
      const { firstName, lastName, email, password } = req.body;
      await prismaClient.user
        .create({
          data: {
            firstName,
            lastName,
            email,
            password,
          },
        })
        .then((result) => {
          return res.status(201).json({
            message: "Usuario criado com sucesso",
            user: result,
          });
        })
        .catch((error) => {
          return res.status(500).json({
            message: "Erro ao criar um novo usuario",
            error: error,
          });
        });
    })
    .put(async (req, res) => {
      const User_id = req.params.id;
      if (User_id) {
        const { firstName, lastName, email, password } = req.body;
        const userUpdate = await prismaClient.user.update({
          where: {
            id: User_id,
          },
          data: {
            firstName,
            lastName,
            email,
            password,
          },
        });
        if (userUpdate) {
          return res.status(200).json({
            message: "Usuario alterado com sucesso",
            user: userUpdate,
          });
        } else {
          return res.status(500).json({
            message: "Erro ao alterar o usuario",
          });
        }
      } else {
        return res.status(500).json({
          message: "Nenhum usuario passado para alterar",
        });
      }
    })
    .delete(async (req, res) => {
      const User_id = req.params.id;
      if (User_id) {
        await prismaClient.user
          .delete({
            where: {
              id: User_id,
            },
          })
          .then((user) => {
            if (user) {
              return res.status(200).json({
                message: "Usuario deletado com sucesso",
              });
            } else {
              return res.status(500).json({
                message: "Usuario inexistente",
              });
            }
          })
          .catch((error) => {
            return res.status(500).json({
              message: "Erro ao deletar o usuario",
              error,
            });
          });
      } else {
        return res.status(500).json({
          message: "Nenhum usuario passado para deletar",
        });
      }
    });
};
