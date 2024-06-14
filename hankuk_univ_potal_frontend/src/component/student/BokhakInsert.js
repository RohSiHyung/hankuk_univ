import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Paper, Typography, Stack, Pagination, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import { Table, Input, Button } from 'reactstrap';
import '../student/css/HueAndBok.css';
import Swal from "sweetalert2";
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useAtomValue } from 'jotai/react';
import { url } from '../../config/config';
import { memberAtom, tokenAtom } from '../../atoms';
import React, { useEffect, useState } from 'react';
import BokInfo from '../student/BokInfo';

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

function getStatusStyle(status) {
    switch (status) {
        case 'REQ':
            return { color: 'blue' };
        case 'APP':
            return { color: 'green' };
        case 'REJ':
            return { color: 'red' };
        default:
            return {};
    }
}

function parseSemester(data) {
    const year = Math.floor(data / 100);
    const semester = data % 100;
    return `${year}년도 ${semester}학기`;
}

const BokhakInsert = () => {
    const navigate = useNavigate();
    const [bokhak, setBokhak] = useState([]);
    const token = useAtomValue(tokenAtom);
    const member = useAtomValue(memberAtom);
    const [type, setType] = useState('');
    const [pageInfo, setPageInfo] = useState({
        curPage: 1,
        startPage: 1,
        endPage: 1,
        allPage: 1
    });
    const [pageBtn, setPageBtn] = useState([]);
    const handlePageChange = (page) => {
        fetchData(page); // 페이지 변경 시 데이터 다시 가져오기
    };

    const handleTypeChange = (e) => {
        const selectData = e.target.value;
        setType(selectData);
    }

    const alert = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "복학 신청을 완료하시겠습니까?",
            text: "한 번 제출된 복학신청은 철회할 수 없습니다.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "확인"
        }).then((result) => {
            if (result.isConfirmed) {
                submit(e);
            }
        });
    }

    const [formValues, setFormValues] = React.useState({
        stdNo: '',
        type: '',
        year: '',
        sem: '',
        files: '',
        reason: ''
    });

    const dataChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }


    const submit = (e) => {
        // const formData = new FormData();
        // formData.append("stdNo", member.id);
        // formData.append("type", formValues.type);
        // formData.append("hueSem", formValues.year + formValues.sem);
        // formData.append("files", formValues.files);
        // formData.append("reason", formValues.reason);
        // formData.append("sect", 'B');

        // axios.post('http://localhost:8090/hueInsert', formData)
        //     .then(res => {
        //         console.log(res.data);
        //         navigate('/student/resSemester')
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
    }


    useEffect(() => {
        console.log(token);
        if(token.access_token==='') return
        fetchData(1);
    }, [token, type]);

    const fetchData = (page) => {
        const listUrl = `${url}/hueListByStdNo?stdNo=${member.id}&page=${page}&type=${type}`;
        console.log(listUrl);
        axios.get(listUrl, { headers: { Authorization: JSON.stringify(token) } })
            .then(res => {
                setBokhak([...res.data.bokhak]);
                setPageInfo({ ...res.data.pageInfo });
                // 페이지 버튼 설정
                let pageButtons = [];
                for (let i = res.data.pageInfo.startPage; i <= res.data.pageInfo.endPage; i++) {
                    pageButtons.push(i);
                }
                setPageBtn([...pageButtons]);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>복학 신청</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <div id="breadCrumb" style={{ margin:'24px 40px 32px'}}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="none" color="inherit" href="/student">
                            <HomeIcon />
                        </Link>
                        <Link color="inherit" underline='none'>
                            학적
                        </Link>
                        <Link underline="hover" color="#4952A9">
                            <b>복학 신청</b>
                        </Link>
                    </Breadcrumbs>
                </div>
                <Grid container>
                    <Grid item xs={1}></Grid>

                    <Grid item xs={10} >
                        <div className="categori">
                            <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
                            <span style={{ fontSize: 'x-large' }}><b>복학 시 유의 사항</b></span>
                        </div>
                        <div className='box' style={{overflowY:'scroll', height:'300px'}}>
                            <div>
                                <BokInfo/>
                            </div>
                        </div>

                        <div className="categori">
                            <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
                            <span style={{ fontSize: 'x-large' }}><b>휴학 내역</b></span>
                        </div>
                        <div style={{ padding: '0px 50px 0px', textAlign: 'center', fontSize: 'larger' }}>
                            {bokhak.length === 0 ? (
                                <div className="noneData">조회 내역이 없습니다.</div>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Input type="select" className="selBox" name="status">
                                            <option>처리 현황</option>
                                            <option value="REQ">신청</option>
                                            <option value="REJ">반려</option>
                                            <option value="APP">승인</option>
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
                                                {/* <th>상세보기</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* {bokhak.filter(bok => bok.sect === 'H').map(hue => (
                                                <tr key={bok.hueNo}>
                                                    <td scope="row">{hue.hueNo}</td>
                                                    <td>{typeMap[hue.type] || hue.type}</td>
                                                    <td>{hue.appDt}</td>
                                                    <td>{parseSemester(hue.hueSem)}</td>
                                                    <td style={getStatusStyle(hue.status)}>
                                                        {statusMap[hue.status] || hue.status}
                                                    </td> */}
                                                    {/* {hue.status === 'REJ' ? (
                                                        <td><Button variant="text" onClick={() => trClick(hue)}>상세보기</Button></td>
                                                    ) : (
                                                        <td onClick={(e)=> setClose(false)}>-</td>
                                                    )
                                                    } */}
                                                {/* </tr>
                                            ))} */}
                                        </tbody>
                                    </Table>
                                    <Stack spacing={2} alignItems="center" sx={{ marginBottom: 1 }}>
                                        <Pagination count={pageInfo.allPage} page={pageInfo.curPage} onChange={(e, page) => handlePageChange(page)} />
                                    </Stack>
                                </>
                            )}
                        </div>
                        
                        <div className="categori">
                            <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
                            <span style={{ fontSize: 'x-large' }}><b>복학 신청</b></span>
                        </div>

                        <form onSubmit={submit}>
                            <div style={{ display: 'flex', padding: '10px' }}>
                                <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-4 title">복학 구분</div>
                                    <div className="col-6">
                                        <Input type="select" id="type" name="type"
                                            onChange={dataChange}>
                                            <option>---선택하세요---</option>
                                            <option value="o">일반 복학</option>
                                            {member.gender !== 'F' ?
                                                (<>
                                                    <option value="m">군 복학</option>
                                                </>
                                                ) : (<></>)
                                            }
                                            <option value="p">출산, 임신 복학</option>
                                            <option value="s">창업 복학</option>
                                            <option value="i">질병 복학</option>
                                            <option value="k">육아 복학</option>
                                        </Input>
                                    </div>
                                </div>
                                <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-4 title">신청 일자</div>
                                    <div className="col-6">
                                        <Input
                                            id="exampleDate"
                                            name="date"
                                            placeholder="date placeholder"
                                            type="date"
                                            onChange={dataChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-4 title">휴학 번호</div>
                                    <div className="col-6">
                                    <Input type="select" id="type" name="type" onChange={dataChange}>
                                        {bokhak.map(hue => (
                                            <option key={hue.hueNo} value={hue.hueNo}>
                                                {hue.hueNo}
                                            </option>
                                        ))}
                                    </Input>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', padding: '10px' }}>
                                <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-4 title">복학 년도</div>
                                    <div className="col-6">
                                        <Input type="text" id="year" name="year"
                                            placeholder='2024'
                                            onChange={dataChange}
                                        />
                                    </div>
                                </div>

                                <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-4 title">복학 학년</div>
                                    <div className="col-6">
                                        <Input type="select" id="sem" name="sem"
                                            onChange={dataChange}>

                                            <option>학년 선택</option>
                                            <option value="01">1학년</option>
                                            <option value="02">2학년</option>
                                            <option value="02">3학년</option>
                                            <option value="02">4학년</option>
                                        </Input>
                                    </div>
                                </div>


                                <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-4 title">복학 학기</div>
                                    <div className="col-6">
                                        <Input type="select" id="sem" name="sem"
                                            onChange={dataChange}>
                                            <option>학기 선택</option>
                                            <option value="01">1학기</option>
                                            <option value="02">2학기</option>
                                        </Input>
                                    </div>
                                </div>
                            </div>


                            <div className="col-12" style={{ padding: '50px 30px 0px', display: 'flex', justifyContent: 'center' }}>
                                <Button style={{ backgroundColor: '#1F3468' }} onClick={alert}>복학 신청</Button>
                            </div>
                        </form>

                        
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default BokhakInsert;