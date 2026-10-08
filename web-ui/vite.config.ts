import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const reportsApi = () => {
  return {
    name: 'reports-api',
    configureServer(server: any) {
      server.middlewares.use('/api/reports', (req: any, res: any) => {
        const reportsDir = path.resolve(__dirname, '../reports');
        let allReports: any[] = [];

        if (fs.existsSync(reportsDir)) {
          const apps = fs.readdirSync(reportsDir);
          for (const app of apps) {
            const appDir = path.join(reportsDir, app);
            if (fs.statSync(appDir).isDirectory()) {
              const dates = fs.readdirSync(appDir);
              for (const date of dates) {
                const reportPath = path.join(appDir, date, 'report.md');
                if (fs.existsSync(reportPath)) {
                  const content = fs.readFileSync(reportPath, 'utf8');
                  allReports.push({
                    id: `${app}-${date}`,
                    app,
                    date,
                    content
                  });
                }
              }
            }
          }
        }

        // Sort by newest first
        allReports.sort((a, b) => b.date.localeCompare(a.date));

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(allReports));
      });
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), reportsApi()],
})
