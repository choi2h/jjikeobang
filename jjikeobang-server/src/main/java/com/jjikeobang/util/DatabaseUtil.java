package com.jjikeobang.util;

import java.io.InputStream;
import java.sql.*;
import java.util.Properties;

public class DatabaseUtil {
    public static Connection getConnection() {
        Connection conn = null;
        Properties prop = new Properties();

        try (InputStream input = DatabaseUtil.class.getClassLoader().getResourceAsStream("db.properties")){

            if (input == null) {
                throw new RuntimeException("db.properties 파일 없어!!!!");
            }

            prop.load(input);

            String driver= prop.getProperty("driver");
            String url = prop.getProperty("url");
            String user = prop.getProperty("user");
            String password = prop.getProperty("password");

            Class.forName(driver); //jdk 버전 상관없이 리소스 로드 할때는 반드시 명시 !!!
            conn = DriverManager.getConnection(url, user, password);

            conn.setAutoCommit(false); //트랜잭션 수동 설정


            if (!conn.isClosed()) {
                System.out.println("연결 중이야  ");
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return conn;
    }

    public static void Close(Connection con) {
        if (con != null) {
            try {
                con.close();
            } catch (SQLException e) {
                System.out.println("데이터베이스 연결 닫기 오류 :" + e.getSQLState() + "\t" + e.getMessage());
            }
        }
    }

    public static void Close(Statement stmt) {
        if (stmt != null) {
            try {
                stmt.close();
            } catch (SQLException e) {
                System.out.println("명령 오류 :" + e.getSQLState() + "\t" + e.getMessage());
            }
        }
    }

    public static void Close(ResultSet rs) {
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                System.out.println("쿼리 리턴 오류 :" + e.getSQLState() + "\t" + e.getMessage());
            }
        }
    }

    public static void commit(Connection con) {
        if (con != null) {
            try {
                con.commit();
            } catch (SQLException e) {
                System.out.println("데이터베이스 연결 닫기 오류 :" + e.getSQLState() + "\t" + e.getMessage());
            }
        }
    }

    public static void rollback(Connection con) {
        if (con != null) {
            try {
                con.rollback();
            } catch (SQLException e) {
                System.out.println("데이터베이스 연결 닫기 오류 :" + e.getSQLState() + "\t" + e.getMessage());
            }
        }
    }
}
