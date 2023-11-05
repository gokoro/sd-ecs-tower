# SD-ECS-Tower

A set of servers to control and maintain [AUTOMATIC1111's Stable Diffusion Web UI](https://github.com/AUTOMATIC1111/stable-diffusion-webui), inside AWS ECS cluster. This repo includes several inter-communicatable server applications to manage SD Webui.

Unlike local SD server or an instance commonly accessed via SSH, there are some difficulties to get control when running it on over ECS container. This repo provides some way to solve it, such as flawlessly accessable management UI.

## Feature

- `attached`: A server attached to GPU instance and manage downloading weights.
- `monitor`: Another server independently running as the backend of management UI.
- `client`: Management UI.

## License

This project is under MIT license.
