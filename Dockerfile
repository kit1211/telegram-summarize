# ใช้ Node 18 + Bun
FROM node:18-bullseye

# ติดตั้ง Bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

# ตั้งค่า Working Directory
WORKDIR /usr/src/app

# คัดลอกไฟล์โปรเจคไปที่ Container
COPY . .

# ติดตั้ง Prisma CLI ก่อน
RUN bun add -g prisma

# ติดตั้ง Dependencies
RUN bun install

# สร้าง Prisma Client
RUN bun prisma generate

# เปิดพอร์ต 3000
EXPOSE 3000

# เริ่มต้นเซิร์ฟเวอร์
CMD ["bun", "run", "src/app.ts"]
