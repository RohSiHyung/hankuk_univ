import Grid from '@mui/material/Grid';
import { Paper, Typography, Select, MenuItem, FormControl } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import StopRoundedIcon from '@mui/icons-material/StopRounded';
import { Table, Input, Button } from 'reactstrap';

const typeMap = {
    p: '출산, 임신 휴학',
    k: '육아 휴학',
    o: '일반 휴학',
    m: '군 휴학',
    s: '창업 휴학',
    i: '질병 휴학'
};

const statusMap = {
    REQ: '신청',
    REJ: '반려',
    APP: '승인'
};

const StaffHuehak = () => {
    const [huebok, setHuebok] = useState([]);
    const token = useAtomValue(tokenAtom);
    const member = useAtomValue(memberAtom);

    useEffect(() => {
        console.log(token);
        if(token.access_token==='') return

        axios.get(`${url}/hueListByStdNo`, { headers: { Authorization: JSON.stringify(token) } })
            .then(res => {
                console.log(res.data);
                setHuebok([...res.data])
            });
    }, [token]);

    
    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>휴복학 신청 관리</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <div id="breadCrumb" style={{ margin: '24px 40px 32px' }}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="none" color="inherit" href="/student">
                            <HomeIcon />
                        </Link>
                        <Link color="inherit" underline='none'>
                            학생 지원
                        </Link>
                        <Link underline="hover" color="#4952A9">
                            <b>휴복학 신청 관리</b>
                        </Link>
                    </Breadcrumbs>
                </div>
                <Grid container>
                    <Grid item xs={1}></Grid>

                    <Grid item xs={10} >
                        <div className="categori">
                            <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
                            <span style={{ fontSize: 'x-large' }}><b>휴학 신청 현황</b></span>
                        </div>
                        <div style={{ padding: '0px 50px 30px', textAlign: 'center', fontSize: 'larger' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Input type="select" className="selBox">
                                    <option>처리 현황</option>
                                    <option value="REQ">신청</option>
                                    <option value="REJ">반려</option>
                                    <option value="APP">완료</option>
                                </Input>&nbsp;&nbsp;&nbsp;
                                <Input type="select" className="selBox" id="type" name="type">
                                    <option>구분</option>
                                    <option value="o">일반 휴학</option>
                                    {member.gender !== 'F' ? (<><option value="m">군 휴학</option></>) : ''}
                                    <option value="p">출산, 임신 휴학</option>
                                    <option value="s">창업 휴학</option>
                                    <option value="i">질병 휴학</option>
                                    <option value="k">육아 복학</option>
                                </Input>
                            </div>
                            <Table className="table" bordered>
                                <thead>
                                    <tr>
                                        <th>휴학 번호</th>
                                        <th>휴학 유형</th>
                                        <th>휴학 신청 일자</th>
                                        <th>휴학 학기</th>
                                        <th>처리 상태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td scope="row">{hue.hueNo}</td>
                                        <td>{typeMap[hue.type] || hue.type}</td>
                                        <td>{hue.appDt}</td>
                                        <td>{hue.hueSem}</td>
                                        <td>{statusMap[hue.status] || hue.status}</td>
                                    </tr>

                                    {/* {huebok.filter(hue => hue.sect === 'H').map(hue => (
                                        <tr key={hue.hueNo}>
                                            <td scope="row">{hue.hueNo}</td>
                                            <td>{typeMap[hue.type] || hue.type}</td>
                                            <td>{hue.appDt}</td>
                                            <td>{hue.hueSem}</td>
                                            <td>{statusMap[hue.status] || hue.status}</td>
                                        </tr>
                                    ))} */}
                                </tbody>
                            </Table>
                        </div>

                    </Grid>

                    <Grid item xs={1}></Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default StaffHuehak;