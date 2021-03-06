USE [dbClient]
GO
/****** Object:  StoredProcedure [dbo].[StoredController]    Script Date: 08/02/2020 15:53:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[StoredController] 
	@action int = 3, -- Inserir = 0, Excluir = 1, Alterar = 2, Exibir = 3
	@id int = NULL,
	@codeId int = NULL,
	@name varchar(50) = NULL,
	@mail varchar(50) = NULL,
	@contact varchar(50) = NULL,
	@vezes int = NULL
AS
BEGIN
	IF (@action = 0) -- INSERIR
		BEGIN
			INSERT INTO client(name, mail)
			VALUES(@name, @mail)

			INSERT INTO contactClient(codeId, contact)
			VALUES(@@IDENTITY, @contact)

		END

	ELSE IF (@action = 1) -- EXCLUIR
		BEGIN
			
			DELETE FROM client WHERE id = @id
			DELETE FROM contactClient WHERE codeId = @id

		END

	ELSE IF (@action = 2) -- ALTERAR
		BEGIN

			UPDATE client SET name = @name, mail = @mail	WHERE id = @id
			UPDATE contactClient SET contact = @contact WHERE codeId = @id AND id = @codeId

		END

	ELSE IF (@action = 3) -- EXIBIR
		BEGIN

			SELECT client.id, contactClient.codeId, client.name, client.mail, contactClient.contact
			FROM client
			INNER JOIN contactClient ON client.id=contactClient.codeId

			
		END
	ELSE
		BEGIN
			RAISERROR('Função invalida', 14, 1)
		END

	SET NOCOUNT ON;
   
END
