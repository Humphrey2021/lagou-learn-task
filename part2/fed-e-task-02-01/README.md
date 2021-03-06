## 简答题

**1、谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值。**

答: 
1. 什么是前端工程化
> 一切以提高效率、降低成本、质量保证为目的的手段都属于【工程化】

一切技术都是为了解决问题在存在的。所以前端工程化的出现也是为了解决前端项目越来越大的问题而出现的。

2. 前端工程化主要解决的问题
1. 传统语言或语法的弊端
2. 无法使用模块化/组件化
3. 重复的机械式工作
4. 代码风格统一、质量保证
5. 依赖后端服务接口支持
6. 整体依赖后端项目

3. 工程化是如何表现的

以一个项目的开发流程为例
创建 ---> 编码 ---> 预览/测试 ---> 提交远程仓库 ---> 部署上线
- 在项目创建阶段，我们可以使用脚手架工具进行项目初期的构建
- 编码阶段，我们可以制定一个规范，格式化代码，校验代码风格等
- 预览/测试阶段，可以使用 webServer 进行热更行，mock去模拟接口数据等
- 提交远程仓库，可以使用 GIT Hooks，lint-staged 在提交之前做代码质量，编码风格的检查
- 部署上线，CI/CD 自动发布，避免人为操作失误等

4. 工程化并不等于某个工具
由于 webpack 功能过于强大，会有人认为工程化就是指webpack，其实这是错误的。
工程化是对项目整体的一种规划和架构，而像webpack等工具只是去实现这种规划和架构的一种手段。

针对于个人实际工作开发项目中，工程化对我而言带来的价值就是：首先可以快速的构建出一个基础的项目，其次可以在实际开发中使用最新的语法，让开发过程变的更便捷，还有打包部署一行命令解决等等

**2、你认为脚手架除了为我们创建项目结构，还有什么更深的意义？**

答: 脚手架除了为了我们创建项目的基本结构外，其实还提供一些项目的规范和约定。让我们可以在无论任何人接手项目时，都可以是统一的代码风格等等

## 编程题

**1、概述脚手架实现的过程，并使用 NodeJS 完成一个自定义的小型脚手架工具**

答：[脚手架](https://github.com/Humphrey2021/simple-scaffolding)

　

**2、尝试使用 Gulp 完成项目的自动化构建**  ( **[先要作的事情](https://gitee.com/lagoufed/fed-e-questions/blob/master/part2/%E4%B8%8B%E8%BD%BD%E5%8C%85%E6%98%AF%E5%87%BA%E9%94%99%E7%9A%84%E8%A7%A3%E5%86%B3%E6%96%B9%E5%BC%8F.md)** )

(html,css,等素材已经放到code/pages-boilerplate目录)

答：[项目及文档地址](https://github.com/Humphrey2021/gulp-demo)

## 说明：

本次作业中的编程题要求大家完成相应代码后

- 提交一个项目说明文档，要求思路流程清晰。
- 或者简单录制一个小视频介绍一下实现思路，并演示一下相关功能。
- 说明文档和代码统一提交至作业仓库。