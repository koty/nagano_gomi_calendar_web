/** @type {import('next').NextConfig} */
/* 公開時のサブディレクトリ */
const SUB_DIRECTORY = "/nagano_gomi_calendar_web";

/* 本番環境と開発環境の分岐用のフラグ */
const isProd = process.env.NODE_ENV == "production"
 
const nextConfig = {
  output: 'export',
  basePath: isProd ? SUB_DIRECTORY : "",
};

export default nextConfig;
