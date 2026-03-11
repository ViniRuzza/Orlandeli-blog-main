import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => {
    const cloudinaryName = env('CLOUDINARY_NAME', '');
    const cloudinaryKey = env('CLOUDINARY_KEY', '');
    const cloudinarySecret = env('CLOUDINARY_SECRET', '');

    // Só ativa Cloudinary se TODAS as credenciais estiverem definidas
    const useCloudinary = cloudinaryName && cloudinaryKey && cloudinarySecret;

    if (!useCloudinary) {
        // Usa armazenamento local (padrão do Strapi) — uploads ficam em /public/uploads/
        return {};
    }

    return {
        upload: {
            config: {
                provider: 'cloudinary',
                providerOptions: {
                    cloud_name: cloudinaryName,
                    api_key: cloudinaryKey,
                    api_secret: cloudinarySecret,
                },
                actionOptions: {
                    upload: {},
                    uploadStream: {},
                    delete: {},
                },
            },
        },
    };
};

export default config;
