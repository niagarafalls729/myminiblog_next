import './globals.css';
import { Inter } from 'next/font/google';
import UseFooter from './layout/footer/Index';
import Navigation from './layout/navigation/Index';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Providers } from '@/redux/provider';
import 'react-quill/dist/quill.snow.css';

const inter = Inter({ subsets: ['latin'] });
export const metadata = {
  title: '지수의 블로그 v2',
  description: '개인 공부 적용하면서 계속해서 발전 하는 블로그 입니다.',
};
export default function RootLayout({ children }: any) {
  return (
    <html>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
      <meta
        name="viewport"
        content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
      />
      <body>
        <Providers>
          <div className="wrap">
            <Navigation />
            <div className="content-wrap">{children}</div>
          </div>
          <UseFooter />
        </Providers>
      </body>
    </html>
  );
}
