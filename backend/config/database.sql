

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Campaign`
--

DROP TABLE IF EXISTS `Campaign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Campaign` (
  `campaignID` int NOT NULL AUTO_INCREMENT,
  `campaignTitle` varchar(45) NOT NULL,
  `campaignDescription` varchar(1000) DEFAULT NULL,
  `userID` int NOT NULL,
  `goal` double NOT NULL,
  `category` varchar(45) NOT NULL,
  `region` varchar(45) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `creationDate` date NOT NULL,
  `campaignStatus` enum('ongoing','complete','draft','pending') NOT NULL DEFAULT 'ongoing',
  `posterImage` blob,
  PRIMARY KEY (`campaignID`),
  KEY `idUser_idx` (`userID`),
  CONSTRAINT `idUser` FOREIGN KEY (`userID`) REFERENCES `User` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Campaign`
--

LOCK TABLES `Campaign` WRITE;
/*!40000 ALTER TABLE `Campaign` DISABLE KEYS */;
INSERT INTO `Campaign` VALUES (1,'Uncle\'s Operation','My uncle is going to operate his liver, and we currently do not have enough funds to pay for it.',1,5000,'Medical','United Kingdom','2023-10-24','2023-12-15','2023-10-24','ongoing',NULL),(2,'Kids Christmas Toys Fundraiser','We want to raise money in order to buy Christmas gifts for the less fortunate kids in Paris',3,2500,'Community','France','2023-11-01','2023-12-01','2023-10-24','pending',NULL),(3,'Football Equipment for Kid\'s Football Team','Looking for funds to be able to buy equipment such as kits, and other training equipment for a local kid\'s football team',2,1000,'Community','United Kingdom','2023-10-30','2023-11-30','2023-10-24','pending',NULL),(4,'Science Equipment','Looking to raise money for a after club dedicated to Science',4,800,'Education & Learning','Spain','2023-10-24','2023-12-01','2023-10-24','ongoing',NULL),(5,'Concert Fundraiser','We want to start a Concert in order to raise fund for the children suffering from the conflict between Israel and Palestine.',5,14000,'War','Worldwide','2023-10-25','2024-03-01','2023-10-25','ongoing',NULL),(6,'Final University Project','I am looking to work on a cure for Blindness, however the funds my university provides are not enough. I would really appreciate if I was given a bit more support to access resources and keep going on the research.',1,1000,'Education & Learning','United Kingdom','2023-10-25','2023-12-01','2023-10-24','ongoing',NULL),(7,'Helping Homeless Families','Support homeless families in our community by providing shelter and basic necessities.',3,3500,'Social Welfare','United Kingdom','2023-11-01','2024-01-01','2023-10-25','pending',NULL),(8,'Clean Water for Villages','Bring clean drinking water to remote villages, improving health and sanitation.',4,1500,'Humanitarian','France','2024-01-01','2024-03-01','2023-10-25','pending',NULL),(9,'Educational Scholarships','Provide scholarships for underprivileged students to access quality education.',2,10000,'Education & Learning','Spain','2023-12-01','2024-04-01','2023-10-25','pending',NULL),(10,'Wildlife Conservation','Preserve endangered species and their habitats through conservation efforts.\"',5,2500,'Environment','Germany ','2023-10-31','2024-02-01','2023-10-25','pending',NULL);
/*!40000 ALTER TABLE `Campaign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CampaignImages`
--

DROP TABLE IF EXISTS `CampaignImages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CampaignImages` (
  `campaignImgID` int NOT NULL AUTO_INCREMENT,
  `campaignID` int NOT NULL,
  `image` blob NOT NULL,
  PRIMARY KEY (`campaignImgID`),
  KEY `campaignFK_idx` (`campaignID`),
  CONSTRAINT `campaignFK` FOREIGN KEY (`campaignID`) REFERENCES `Campaign` (`campaignID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CampaignImages`
--

LOCK TABLES `CampaignImages` WRITE;
/*!40000 ALTER TABLE `CampaignImages` DISABLE KEYS */;
/*!40000 ALTER TABLE `CampaignImages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Comments`
--

DROP TABLE IF EXISTS `Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comments` (
  `commentID` int NOT NULL AUTO_INCREMENT,
  `campaignID` int NOT NULL,
  `userID` int NOT NULL,
  `commentText` varchar(255) NOT NULL,
  `commentDate` date NOT NULL,
  PRIMARY KEY (`commentID`),
  KEY `user_idx` (`userID`),
  KEY `campaign_idx` (`campaignID`),
  CONSTRAINT `campaign` FOREIGN KEY (`campaignID`) REFERENCES `Campaign` (`campaignID`),
  CONSTRAINT `user` FOREIGN KEY (`userID`) REFERENCES `User` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comments`
--

LOCK TABLES `Comments` WRITE;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
INSERT INTO `Comments` VALUES (1,2,1,'Very nice','2023-10-26');
/*!40000 ALTER TABLE `Comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Donation`
--

DROP TABLE IF EXISTS `Donation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Donation` (
  `donationID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `campaignID` int DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `date` date DEFAULT NULL,
  `anonymous` enum('YES','NO') DEFAULT 'NO',
  PRIMARY KEY (`donationID`),
  KEY `campaignID_idx` (`campaignID`),
  KEY `donorID_idx` (`userID`),
  CONSTRAINT `campaignID` FOREIGN KEY (`campaignID`) REFERENCES `Campaign` (`campaignID`),
  CONSTRAINT `donorID` FOREIGN KEY (`userID`) REFERENCES `User` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Donation`
--

LOCK TABLES `Donation` WRITE;
/*!40000 ALTER TABLE `Donation` DISABLE KEYS */;
/*!40000 ALTER TABLE `Donation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `emailAddress` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `userID_UNIQUE` (`userID`),
  UNIQUE KEY `emailAddress_UNIQUE` (`emailAddress`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'Usu','Edeaghe','usuedeaghe@gmail.com','test'),(2,'Christopher','Okeahialam','chrisokea@hotmail.com','test'),(3,'Michael','Omoyele','michaelomoyele12@gmail.com','test'),(4,'Abayomi Abdul','Lawal','metwad@hotmail.com','test'),(5,'Omar ','Hussain','omar-93@hotmail.co.uk','test');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-26 19:28:57
