import React, {useEffect, useState} from 'react';
import {useDebounce} from "../utils/useDebounce";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import baseUrl from "../config/apis";
import {Grid} from "@material-ui/core";
import MymoAvatar from "./MymoAvatar";
import {Link} from "react-router-dom";
import theme from "../assets/theme";
import searchIcon from '../assets/img/search.svg'
import searchClear from '../assets/img/search_clear.svg'
import searchLoadding from "../assets/img/loading.svg";
const useStyles = makeStyles((theme) => ({
    root:{
      position:'relative',
    },
    form: {
        width:'392px',
        height:'45px',
        display: 'flex',
        padding: '12px 16px',
        background: 'white',
        borderRadius: '92px',
        position: 'relative',
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    input:{
        width: '292px',
        border: 'none',
        outline: 'none',
        fontWeight: 400,
        fontSize: '16px',
    },
    inputLeft:{
        width: '100px',
        height: '100%',
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    loading:{
        width: '20px',
        height: '20px',
        marginTop: '3px',
        marginRight: '5px',
        background: `url(${searchLoadding})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    close:{
        width: '18px',
        height: '18px',
        marginTop: '3px',
        marginRight: '5px',
        background: `url(${searchClear})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        cursor: 'pointer',
    },
    split: {
        width: '1px',
        height: '28px',
        background: 'rgba(22,24,35,0.12)'
    },
    button: {
        padding:' 11px 16px 11px 12px',
        marginLeft:'5px',
        fontSize: 0,
        cursor: 'pointer',
        outline: 'none',
        border: 'none',
        background: `url(${searchIcon})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    searchResults: {
        position: 'absolute',
        top: '55px',
        left: 0,
        width: '100%',
        background: 'white',
        color: 'black',
    },
    searchResultsItem:{
        padding: '12px',
        '&:hover': {
            backgroundColor: '#f9f8f8'
        },
    },
    searchResultsTitle:{
        padding: '10px 12px',
    },
    searchResultsMore:{
        color:'black',
        height: '50px',
        lineHeight: '50px',
        padding: '10px 12px',
        fontWeight: 'bold'
    },
    img: {
        width: '240px',
        marginBottom: '20px',
    },
    text: {
        fontSize: '18px',
    },
    avatar: {
        marginRight: theme.spacing(2),
        width: '50px',
        height: '50px',
    },
    name: {
        fontWeight: 600,
        fontSize: '20px',
        fontFamily: 'Poppins',
        marginRight: '20px',
        color: 'black',
    },
    email: {
        maxWidth: '600px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        color: 'black',
    },
}));
interface AccountValuesProps {
    _id: string;
    avatar: string;
    fullName: string;
    followerNum: number;
    desc: string;
    email: string;
    name:string;
}
export const SearchAutoComplete:React.FC = () => {
    const classes = useStyles();
    const [panelShow,setPanelShow] = useState(false)
    const [searchValue,setSearchValue] = useState('')
    const [searchPagination,setSearchPagination] = useState(0)
    const [accountValues, setAccountValues] = useState<AccountValuesProps[]>([]);
    const [loading, setLoading] = useState(false)
    const params = useDebounce(searchValue,300)
    const getSearchAccountValue = async () => {
        setAccountValues([])
        setLoading(true)
        const res = await axios.get(`${baseUrl}/user/search?search=${params}&page=1&pageSize=5`);
        setAccountValues(res.data.data)
        setSearchPagination(res.data.pagination.totalSize)
        setLoading(false)
        setPanelShow(true)
    };
    const handleOnChange = (e:any) => {
        setSearchValue(e.target.value)
    }
    const handleOnFocus = (e:any) => {
        searchValue && accountValues.length !==0 && setPanelShow(true)
    }
    const handleOnBlur = (e:any) => {
        setTimeout(function() {
            setPanelShow(false)
        }, 100);
    }
    const searchValueClear = () => {
        setAccountValues([])
        setSearchValue('')
    }
    useEffect(() => {
        params ? getSearchAccountValue() : setAccountValues([])
    },[params])
    return <div className={classes.root}>
        <form className={classes.form}>
            <input
                className={classes.input}
                name="search"
                id="search"
                value={searchValue}
                placeholder="SearchAccount"
                autoComplete="off"
                type="text"
                onChange={handleOnChange}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
            />
            <div className={classes.inputLeft}>
                {
                    loading ? <span className={classes.loading}></span>  : (accountValues.length !== 0 && <span className={classes.close} onClick={searchValueClear}></span>)
                }
                <span className={classes.split}/>
                <button type="submit" className={classes.button}></button>
            </div>
        </form>
        {
            accountValues.length !== 0 && panelShow &&
            <div className={classes.searchResults}>
                <h3 className={classes.searchResultsTitle}>Account</h3>
                {
                    accountValues?.map((item, index) => {
                        return (
                           <Link to={`/profile/${item._id}`} key={index} >
                               <div className={classes.searchResultsItem}>
                                   <Grid container className={classes.root}>
                                       <Grid item>
                                           <MymoAvatar avatarSrc={item.avatar} className={classes.avatar} />
                                       </Grid>
                                       <Grid item>
                                           <Grid>
                                               <span className={classes.name}>{item.name}</span>
                                           </Grid>
                                           <Grid className={classes.email}>{item.email}</Grid>
                                       </Grid>
                                   </Grid>
                               </div>
                           </Link>
                        )
                    })
                }
                {
                    searchPagination > 5 && accountValues.length !== 0 && <Link to="/">
                        <h3 className={classes.searchResultsMore}>{`View all results of"${params}"`}</h3>
                    </Link>
                }
            </div>
        }
    </div>
}
