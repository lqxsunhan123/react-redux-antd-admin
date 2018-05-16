package com.sh.ram.common;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Calendar;
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

    /**
     * 当前时间的时间戳
     * @return
     */
    public static String currentTime(){
        Calendar calendar = Calendar.getInstance();
        StringBuffer s = new StringBuffer();
        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH) + 1;
        int day = calendar.get(Calendar.DAY_OF_MONTH);
        int hour = calendar.get(Calendar.HOUR);
        int minute = calendar.get(Calendar.MINUTE);
        int second = calendar.get(Calendar.SECOND);
        int millisecond = calendar.get(Calendar.MILLISECOND);
        return s.append(year).append(month).append(day).append(hour).append(minute).append(second).append(millisecond).toString();
    }

    /**
     * 保存文件的方法
     * @param type 1-移动端保存  2-后台保存
     * @param multipartFile
     * @return
     */
    public static String saveFile(int type, MultipartFile multipartFile){
        String returnUri = null;
        try {
            // 原始文件名(带后缀)
            String originalFilename = multipartFile.getOriginalFilename();
            // .jpg .png 后缀
            String suffix = originalFilename.substring(originalFilename.lastIndexOf("."));
            // 新文件名 时间戳.jpg
            String newFileName = currentTime() + suffix;
            String path = type == Constant.SAVE_TYPE_APP ? Constant.APP_FILE_PATH  : Constant.BACK_FILE_PATH;
            // 保存路径 http://1203.230.23/ram/img/sdfsdf.jpg
            String saveUri = path + newFileName;
            File file = new File(path);
            // 文件夹不存在则创建
            if(! file.exists()){
                file.mkdirs();
            }
            multipartFile.transferTo(new File(saveUri));
            // 返回可访问的uri(http://ip地址/上下文         返回这里的 /img/app/sdfsfd.jpg)
            returnUri = type == Constant.SAVE_TYPE_APP ? Constant.APP_IMG_URI + "/" + newFileName : Constant.BACK_IMG_URI + "/" + newFileName;
        } catch (Exception e){
            e.printStackTrace();
        }
        return returnUri;
    }



}

