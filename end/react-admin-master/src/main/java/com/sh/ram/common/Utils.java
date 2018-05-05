package com.sh.ram.common;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.UUID;

/**
 * @author sunh
 * @date 2018\4\27 0027 12:50
 */
public class Utils {

    /**
     *
     * @param plainText
     *            明文
     * @return 32位密文
     */
    public static String md5(String plainText) {
        String re_md5 = new String();
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(plainText.getBytes());
            byte b[] = md.digest();

            int i;

            StringBuffer buf = new StringBuffer("");
            for (int offset = 0; offset < b.length; offset++) {
                i = b[offset];
                if (i < 0)
                    i += 256;
                if (i < 16)
                    buf.append("0");
                buf.append(Integer.toHexString(i));
            }

            re_md5 = buf.toString();

        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return re_md5;
    }

    /**
     * 生产uuid
     * @return
     */
    public static String generateUUID(){
        return UUID.randomUUID().toString().replace("-", "");
    }

    /**
     * 增减日期的毫秒
     * @param d
     * @param mill
     * @return
     */
    public static Date subOrAddMillSeconds(Date d, long mill){
        d.setTime(d.getTime() + mill);
        return d;
    }



}

