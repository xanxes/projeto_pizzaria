-- CreateTable
CREATE TABLE `tbl_bebida` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `preco` VARCHAR(20) NOT NULL,
    `descricao` TEXT NULL,
    `imagem` VARCHAR(256) NULL,
    `id_fabricante` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_fabricante_bebida`(`id_fabricante`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_bebida_oferta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_bebida` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_bebida_bebida_oferta`(`id_bebida`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_bebida_tipo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_tipo_bebida` INTEGER NOT NULL,
    `id_bebida` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_bebida_bebida_tipo`(`id_bebida`),
    INDEX `FK_tipo_bebida_bebida_tipo`(`id_tipo_bebida`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoria` VARCHAR(45) NOT NULL,
    `id_bebida` INTEGER NOT NULL,
    `id_pizza` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_bebida_categoria`(`id_bebida`),
    INDEX `FK_pizza_categoria`(`id_pizza`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_cidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `id_estado` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_estado_cidade`(`id_estado`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_cliente_contato` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(256) NOT NULL,
    `mensagem` TEXT NOT NULL,
    `tipo` BOOLEAN NULL,
    `telefone` VARCHAR(25) NULL,
    `celular` VARCHAR(25) NOT NULL,
    `id_pizzaria` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_cliente_contato_pizzaria`(`id_pizzaria`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_endereco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logradouro` VARCHAR(45) NULL,
    `bairro` VARCHAR(100) NOT NULL,
    `cep` VARCHAR(45) NOT NULL,
    `numero` INTEGER NOT NULL,
    `id_cidade` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_endereco_cidade`(`id_cidade`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_estado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `sigla` VARCHAR(5) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_fabricante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(20) NOT NULL,
    `telefone` VARCHAR(20) NULL,
    `email` VARCHAR(256) NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_funcionario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(250) NULL,
    `email` VARCHAR(256) NOT NULL,
    `senha` VARCHAR(45) NOT NULL,
    `id_pizzaria` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_funcionario_pizzaria`(`id_pizzaria`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_oferta_pizza_bebida` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `promocao` DECIMAL(10, 0) NULL,
    `id_pizza_oferta` INTEGER NOT NULL,
    `id_bebida_oferta` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_bebida_oferta_oferta_pizza_bebida`(`id_bebida_oferta`),
    INDEX `FK_pizza_oferta_oferta_pizza_bebida`(`id_pizza_oferta`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_pizza` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `preco` VARCHAR(20) NOT NULL,
    `imagem` VARCHAR(256) NOT NULL,
    `likes` INTEGER NOT NULL,
    `descricao` TEXT NULL,
    `id_tipo_pizza` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_tipo_pizza_pizza`(`id_tipo_pizza`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_pizza_oferta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pizza` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_pizza_pizza_oferta`(`id_pizza`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_pizzaria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NULL,
    `telefone` VARCHAR(25) NOT NULL,
    `id_endereco` INTEGER NOT NULL,
    `id_categoria` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_pizzaria_categoria`(`id_categoria`),
    INDEX `FK_pizzaria_endereco`(`id_endereco`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_tipo_bebida` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_tipo_pizza` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_bebida` ADD CONSTRAINT `FK_fabricante_bebida` FOREIGN KEY (`id_fabricante`) REFERENCES `tbl_fabricante`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_bebida_oferta` ADD CONSTRAINT `FK_bebida_bebida_oferta` FOREIGN KEY (`id_bebida`) REFERENCES `tbl_bebida`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_bebida_tipo` ADD CONSTRAINT `FK_bebida_bebida_tipo` FOREIGN KEY (`id_bebida`) REFERENCES `tbl_bebida`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_bebida_tipo` ADD CONSTRAINT `FK_tipo_bebida_bebida_tipo` FOREIGN KEY (`id_tipo_bebida`) REFERENCES `tbl_tipo_bebida`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_categoria` ADD CONSTRAINT `FK_bebida_categoria` FOREIGN KEY (`id_bebida`) REFERENCES `tbl_bebida`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_categoria` ADD CONSTRAINT `FK_pizza_categoria` FOREIGN KEY (`id_pizza`) REFERENCES `tbl_pizza`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_cidade` ADD CONSTRAINT `FK_estado_cidade` FOREIGN KEY (`id_estado`) REFERENCES `tbl_estado`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_cliente_contato` ADD CONSTRAINT `FK_cliente_contato_pizzaria` FOREIGN KEY (`id_pizzaria`) REFERENCES `tbl_pizzaria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_endereco` ADD CONSTRAINT `FK_endereco_cidade` FOREIGN KEY (`id_cidade`) REFERENCES `tbl_cidade`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_funcionario` ADD CONSTRAINT `FK_funcionario_pizzaria` FOREIGN KEY (`id_pizzaria`) REFERENCES `tbl_pizzaria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_oferta_pizza_bebida` ADD CONSTRAINT `FK_bebida_oferta_oferta_pizza_bebida` FOREIGN KEY (`id_bebida_oferta`) REFERENCES `tbl_bebida_oferta`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_oferta_pizza_bebida` ADD CONSTRAINT `FK_pizza_oferta_oferta_pizza_bebida` FOREIGN KEY (`id_pizza_oferta`) REFERENCES `tbl_pizza_oferta`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_pizza` ADD CONSTRAINT `FK_tipo_pizza_pizza` FOREIGN KEY (`id_tipo_pizza`) REFERENCES `tbl_tipo_pizza`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_pizza_oferta` ADD CONSTRAINT `FK_pizza_pizza_oferta` FOREIGN KEY (`id_pizza`) REFERENCES `tbl_pizza`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_pizzaria` ADD CONSTRAINT `FK_pizzaria_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `tbl_categoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_pizzaria` ADD CONSTRAINT `FK_pizzaria_endereco` FOREIGN KEY (`id_endereco`) REFERENCES `tbl_endereco`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
