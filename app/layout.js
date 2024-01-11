import "../sass/main.scss";
import Header from "./_components/Layout/Header";
import Footer from "./_components/Layout/Footer";

export const metadata = {
  title: "Emily Williams - Household Finance",
  description: "The personal site for academic researcher Emily Williams.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={"body min-h-screen relative pb-60"}>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
