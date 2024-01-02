import "../sass/main.scss";
import Header from "./_components/Layout/Header";

export const metadata = {
  title: "Emily Williams - Household Finance",
  description: "The personal site for academic researcher Emily Williams.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={"body"}>
        <Header />
        {children}
      </body>
    </html>
  );
}
