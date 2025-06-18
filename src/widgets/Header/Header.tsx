import Dropdown from "../../features/Dropdown";
import SearchBox from "../../features/SearchBox";
import "./Header.scss";

const Header = () => {
    return (
        <header className="header">
            <div className="header__inner">
                <div className="header__left">
                    <Dropdown />
                </div>
                <div className="header__right">
                    <SearchBox />
                </div>
            </div>
        </header>
    );
};

export default Header;
