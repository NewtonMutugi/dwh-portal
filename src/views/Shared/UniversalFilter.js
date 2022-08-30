import React, { useEffect, useState, useCallback } from 'react'; 
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import { DateInput, MonthInput, MonthRangeInput, YearInput } from 'semantic-ui-calendar-react';
import { Dropdown, Message } from 'semantic-ui-react';
import { PAGES } from '../../constants';
import { Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../actions/Shared/filterActions';
// import * as ctSelectors from '../../selectors/Shared/ctSitesSelector';
import * as htsSelectors from '../../selectors/Shared/htsSitesSelector';
import * as rrSelectors from '../../selectors/Shared/rrSitesSelector';


import * as ctSelectors from './../../atoms/Shared/ctSitesAtom';
import { filtersAtom } from '../../atoms/Shared/filtersAtom'
import { useRecoilValue, useRecoilState } from 'recoil';

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}
const UniversalFilter = () => {
    //new recoil store
    let [filters, setFilters] = useRecoilState(filtersAtom);

    const dispatch = useDispatch();
    const history = useHistory();
    let query = useQuery();
    let queried_partner = query.get('partner') ? [query.get('partner')] : [];

    const isFiltered = (list, filter) => {
        let filtered = false
        switch (filter) {
            case 'county':
                filtered =
                    list.length > 0 ||
                    filters.subCounties.length > 0 ||
                    filters.facilities.length > 0 ||
                    filters.partners.length > 0 ||
                    filters.agencies.length > 0 ||
                    filters.projects.length > 0 ||
                    filters.genders.length > 0 ||
                    filters.datimAgeGroups.length > 0 ||
                    filters.populationTypes.length > 0 ||
                    filters.latestPregnancies.length > 0 ||
                    filters.fromDate !== '' ||
                    filters.toDate !== '';
                    break;
            case 'subcounty': 
                filtered =
                    filters.counties.length > 0 ||
                    list.length > 0 ||
                    filters.facilities.length > 0 ||
                    filters.partners.length > 0 ||
                    filters.agencies.length > 0 ||
                    filters.projects.length > 0 ||
                    filters.genders.length > 0 ||
                    filters.datimAgeGroups.length > 0 ||
                    filters.populationTypes.length > 0 ||
                    filters.latestPregnancies.length > 0 ||
                    filters.fromDate !== '' ||
                    filters.toDate !== '';
                    break
            case 'facility':
                filtered =
                    filters.counties.length > 0 ||
                    list.length > 0 ||
                    filters.subCounties.length > 0 ||
                    filters.partners.length > 0 ||
                    filters.agencies.length > 0 ||
                    filters.projects.length > 0 ||
                    filters.genders.length > 0 ||
                    filters.datimAgeGroups.length > 0 ||
                    filters.populationTypes.length > 0 ||
                    filters.latestPregnancies.length > 0 ||
                    filters.fromDate !== '' ||
                    filters.toDate !== '';
                    break
            case 'parnter':
                filtered =
                    filters.counties.length > 0 ||
                    list.length > 0 ||
                    filters.facilities.length > 0 ||
                    filters.subCounties.length > 0 ||
                    filters.agencies.length > 0 ||
                    filters.projects.length > 0 ||
                    filters.genders.length > 0 ||
                    filters.datimAgeGroups.length > 0 ||
                    filters.populationTypes.length > 0 ||
                    filters.latestPregnancies.length > 0 ||
                    filters.fromDate !== '' ||
                    filters.toDate !== '';
                break
            case 'agency':
                filtered =
                    filters.counties.length > 0 ||
                    list.length > 0 ||
                    filters.facilities.length > 0 ||
                    filters.subCounties.length > 0 ||
                    filters.subCounties.length > 0 ||
                    filters.projects.length > 0 ||
                    filters.genders.length > 0 ||
                    filters.datimAgeGroups.length > 0 ||
                    filters.populationTypes.length > 0 ||
                    filters.latestPregnancies.length > 0 ||
                    filters.fromDate !== '' ||
                    filters.toDate !== '';
                break
            case 'project':
                filtered =
                    filters.counties.length > 0 ||
                    list.length > 0 ||
                    filters.facilities.length > 0 ||
                    filters.subCounties.length > 0 ||
                    filters.agencies.length > 0 ||
                    filters.subCounties.length > 0 ||
                    filters.genders.length > 0 ||
                    filters.datimAgeGroups.length > 0 ||
                    filters.populationTypes.length > 0 ||
                    filters.latestPregnancies.length > 0 ||
                    filters.fromDate !== '' ||
                    filters.toDate !== '';
                break
            case 'gender':
                filtered =
                    filters.counties.length > 0 ||
                    list.length > 0 ||
                    filters.facilities.length > 0 ||
                    filters.subCounties.length > 0 ||
                    filters.agencies.length > 0 ||
                    filters.projects.length > 0 ||
                    filters.subCounties.length > 0 ||
                    filters.datimAgeGroups.length > 0 ||
                    filters.populationTypes.length > 0 ||
                    filters.latestPregnancies.length > 0 ||
                    filters.fromDate !== '' ||
                    filters.toDate !== '';
                break
            case 'agegroup':
                filtered =
                    filters.counties.length > 0 ||
                    list.length > 0 ||
                    filters.facilities.length > 0 ||
                    filters.subCounties.length > 0 ||
                    filters.agencies.length > 0 ||
                    filters.projects.length > 0 ||
                    filters.genders.length > 0 ||
                    filters.subCounties.length > 0 ||
                    filters.populationTypes.length > 0 ||
                    filters.latestPregnancies.length > 0 ||
                    filters.fromDate !== '' ||
                    filters.toDate !== '';
                break
            case 'pregnancy':
                filtered =
                    filters.counties.length > 0 ||
                    list.length > 0 ||
                    filters.facilities.length > 0 ||
                    filters.subCounties.length > 0 ||
                    filters.agencies.length > 0 ||
                    filters.projects.length > 0 ||
                    filters.genders.length > 0 ||
                    filters.datimAgeGroups.length > 0 ||
                    filters.populationTypes.length > 0 ||
                    filters.subCounties.length > 0 ||
                    filters.fromDate !== '' ||
                    filters.toDate !== '';
                break
            case 'fromdate':
                filtered =
                    filters.counties.length > 0 ||
                    filters.subCounties.length > 0 ||
                    filters.facilities.length > 0 ||
                    filters.subCounties.length > 0 ||
                    filters.agencies.length > 0 ||
                    filters.projects.length > 0 ||
                    filters.genders.length > 0 ||
                    filters.datimAgeGroups.length > 0 ||
                    filters.populationTypes.length > 0 ||
                    filters.latestPregnancies.length > 0 ||
                    list !== '' ||
                    filters.toDate !== '';
                break
            case 'todate':
                filtered =
                    filters.counties.length > 0 ||
                    filters.subCounties.length > 0 ||
                    filters.facilities.length > 0 ||
                    filters.subCounties.length > 0 ||
                    filters.agencies.length > 0 ||
                    filters.projects.length > 0 ||
                    filters.genders.length > 0 ||
                    filters.datimAgeGroups.length > 0 ||
                    filters.populationTypes.length > 0 ||
                    filters.latestPregnancies.length > 0 ||
                    list !== '' ||
                    filters.fromDate !== '';
                break
        }
        return filtered;
    };

    // const filters = useSelector((state) => state.filters);
    const ui = useSelector((state) => state.ui);
    const { active_tab } = useParams();

    const [counties, setCounties] = useState([]);
    const [subCounties, setSubCounties] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [partners, setPartners] = useState([]);
    const [agencies, setAgencies] = useState([]);
    const [projects, setProjects] = useState([]);
    const [genders, setGenders] = useState([]);
    const [datimAgeGroups, setDatimAgeGroups] = useState([]);
    const [populationTypes, setPopulationTypes] = useState([]);
    const [latestPregnancies, setLatestPregnancies] = useState([]);
    const [indicators, setIndicators] = useState([]);
    const rrCounties = useSelector(rrSelectors.getCounties);
    const rrSubCounties = useSelector(rrSelectors.getSubCounties);
    const rrFacilities = useSelector(rrSelectors.getFacilities);
    const rrPartners = useSelector(rrSelectors.getPartners);
    const rrAgencies = useSelector(rrSelectors.getAgencies);
    const rrProjects = useSelector(rrSelectors.getProjects);

    const htsCounties = useSelector(htsSelectors.getCounties);
    const htsSubCounties = useSelector(htsSelectors.getSubCounties);
    const htsFacilities = useSelector(htsSelectors.getFacilities);
    const htsPartners = useSelector(htsSelectors.getPartners);
    const htsAgencies = useSelector(htsSelectors.getAgencies);
    const htsProjects = useSelector(htsSelectors.getProjects);

    const ctCounties = useRecoilValue(ctSelectors.getCounties);
    const ctSubCounties = useRecoilValue(ctSelectors.getSubCounties);
    const ctFacilities = useRecoilValue(ctSelectors.getFacilities);
    const ctPartners = useRecoilValue(ctSelectors.getPartners);
    const ctAgencies = useRecoilValue(ctSelectors.getAgencies);
    const ctProjects = useRecoilValue(ctSelectors.getProjects);

    const changeFromQuery = (len) => {
        if (len === 0) {
            query.delete('partner');
            history.replace({
                search: query.toString(),
            });
        }
    };
    let ageGroups;
    if (active_tab === 'comparison')
        ageGroups = [
            'Under 1',
            '1 to 9',
            '10 to 14',
            '15 to 19',
            '20 to 24',
            '25+',
        ];
    else
        ageGroups = [
            'Under 1',
            '1 to 4',
            '5 to 9',
            '10 to 14',
            '15 to 19',
            '20 to 24',
            '25 to 29',
            '30 to 34',
            '35 to 39',
            '40 to 44',
            '45 to 49',
            '50 to 54',
            '55 to 59',
            '60 to 64',
            '65+',
        ];

    const loadSites = useCallback(async () => {
        switch (ui.currentPage) {
            case PAGES.home:
                setCounties(
                    ctCounties.map((c) => ({ value: c, key: c, text: c }))
                );
                setSubCounties(
                    ctSubCounties.map((s) => ({ value: s, key: s, text: s }))
                );
                setFacilities(
                    ctFacilities.map((f) => ({ value: f, key: f, text: f }))
                );
                setPartners(
                    ctPartners.map((p) => ({ value: p, key: p, text: p }))
                );
                setAgencies(
                    ctAgencies.map((a) => ({ value: a, key: a, text: a }))
                );
                setProjects(
                    ctProjects.map((p) => ({ value: p, key: p, text: p }))
                );
                break;
            case PAGES.rr:
                setCounties(
                    rrCounties.map((c) => ({ value: c, key: c, text: c }))
                );
                setSubCounties(
                    rrSubCounties.map((s) => ({ value: s, key: s, text: s }))
                );
                setFacilities(
                    rrFacilities.map((f) => ({ value: f, key: f, text: f }))
                );
                setPartners(
                    rrPartners.map((p) => ({ value: p, key: p, text: p }))
                );
                setAgencies(
                    rrAgencies.map((a) => ({ value: a, key: a, text: a }))
                );
                setProjects(
                    rrProjects.map((p) => ({ value: p, key: p, text: p }))
                );
                break;
            case PAGES.hts:
                setCounties(
                    htsCounties.map((c) => ({ value: c, key: c, text: c }))
                );
                setSubCounties(
                    htsSubCounties.map((s) => ({ value: s, key: s, text: s }))
                );
                setFacilities(
                    htsFacilities.map((f) => ({ value: f, key: f, text: f }))
                );
                setPartners(
                    htsPartners.map((p) => ({ value: p, key: p, text: p }))
                );
                setAgencies(
                    htsAgencies.map((a) => ({ value: a, key: a, text: a }))
                );
                setProjects(
                    htsProjects.map((p) => ({ value: p, key: p, text: p }))
                );
                break;
            case PAGES.ct:
                setCounties(
                    ctCounties.map((c) => ({ value: c, key: c, text: c }))
                );
                setSubCounties(
                    ctSubCounties.map((s) => ({ value: s, key: s, text: s }))
                );
                setFacilities(
                    ctFacilities.map((s) => ({ value: s, key: s, text: s }))
                );
                setPartners(
                    ctPartners.map((p) => ({ value: p, key: p, text: p }))
                );
                setAgencies(
                    ctAgencies.map((a) => ({ value: a, key: a, text: a }))
                );
                setProjects(
                    ctProjects.map((p) => ({ value: p, key: p, text: p }))
                );
                break;
            default:
                setCounties(
                    rrCounties.map((c) => ({ value: c, key: c, text: c }))
                );
                setSubCounties(
                    rrSubCounties.map((s) => ({ value: s, key: s, text: s }))
                );
                setFacilities(
                    rrFacilities.map((f) => ({ value: f, key: f, text: f }))
                );
                setPartners(
                    rrPartners.map((p) => ({ value: p, key: p, text: p }))
                );
                setAgencies(
                    rrAgencies.map((a) => ({ value: a, key: a, text: a }))
                );
                setProjects(
                    rrProjects.map((p) => ({ value: p, key: p, text: p }))
                );
        }
        setGenders(
            ['Male', 'Female'].map((c) => ({ value: c, key: c, text: c }))
        );
        setDatimAgeGroups(
            ageGroups.map((c) => ({ value: c, key: c, text: c }))
        );
        setPopulationTypes(
            [
                ' FSW',
                ' General Population',
                ' MSM',
                ' PWID',
                'General Population',
                'Key population',
            ].map((c) => ({ value: c, key: c, text: c }))
        );
        setLatestPregnancies(
            ['LIVE BIRTH', 'No', 'RECENTLY MISCARRIAGED', 'UNKNOWN', 'YES'].map(
                (c) => ({ value: c, key: c, text: c })
            )
        );
        setIndicators(
            ['Tx_New', 'Tx_Curr'].map((c) => ({ value: c, key: c, text: c }))
        );
    }, [
        ui,

        rrCounties,
        rrSubCounties,
        rrFacilities,
        rrPartners,
        rrAgencies,
        rrProjects,

        htsCounties,
        htsSubCounties,
        htsFacilities,
        htsPartners,
        htsAgencies,
        htsProjects,

        ctCounties,
        ctSubCounties,
        ctFacilities,
        ctPartners,
        ctAgencies,
        ctProjects,
    ]);

    useEffect(() => {
        loadSites();
    }, [loadSites]);

    useEffect(() => {
        console.log(filters.filtered);
    }, [filters]);

    useEffect(() => {
        if (queried_partner) {
            dispatch(actions.filterByPartner(queried_partner));
            return;
        }
    }, []);
    let currentLocation = window.location.href.split('#')[0];

    return (
        <>
            {currentLocation !== 'https://dwh.nascop.org/' &&
            currentLocation !== 'https://prod.kenyahmis.org/' ? (
                <Message warning>
                    <Message.Header>This is the test site</Message.Header>
                    <p>
                        Numbers may vary from those in{' '}
                        <a href={'https://dwh.nascop.org'}>
                            https://dwh.nascop.org
                        </a>
                    </p>
                </Message>
            ) : null}
            <Row>
                {filters.countyFilterEnabled ? (
                    <Col
                        className={
                            'col-12 col-xl-2 col-lg-3 col-md-3 col-sm-6 col-xs-6'
                        }
                    >
                        <div className="form-group">
                            <label htmlFor="county">County</label>
                            <Dropdown
                                id="county"
                                name="county"
                                placeholder="Select County"
                                fluid
                                multiple
                                selection
                                search
                                options={counties}
                                value={filters.counties}
                                onChange={async (e, data) => {
                                    setFilters({
                                        ...filters,
                                        counties: data.value,
                                        filtered: isFiltered(data.value, 'county'),
                                    });
                                    
                                    // dispatch(
                                    //     actions.filterByCounty(data.value)
                                    // );
                                }}
                            />
                        </div>
                    </Col>
                ) : null}
                {filters.subCountyFilterEnabled ? (
                    <Col
                        className={
                            'col-12 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-xl-2'
                        }
                    >
                        <div className="form-group">
                            <label htmlFor="county">Sub-County</label>
                            <Dropdown
                                id="subCounty"
                                name="subCounty"
                                placeholder="Select Sub-County"
                                fluid
                                multiple
                                selection
                                search
                                options={subCounties}
                                value={filters.subCounties}
                                onChange={(e, data) => {
                                    setFilters({
                                        ...filters,
                                        subCounties: data.value,
                                        filtered: isFiltered(
                                            data.value,
                                            'subcounty'
                                        ),
                                    });
                                }}
                            />
                        </div>
                    </Col>
                ) : null}
                {filters.facilityFilterEnabled ? (
                    <Col
                        className={
                            'col-12 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-xl-2'
                        }
                    >
                        <div className="form-group">
                            <label htmlFor="county">Facility</label>
                            <Dropdown
                                id="facility"
                                name="facility"
                                placeholder="Select Facility"
                                fluid
                                multiple
                                selection
                                search
                                options={facilities}
                                value={filters.facilities}
                                onChange={(e, data) => {
                                    setFilters({
                                        ...filters,
                                        facilities: data.value,
                                        filtered: isFiltered(
                                            data.value,
                                            'facility'
                                        ),
                                    });
                                }}
                            />
                        </div>
                    </Col>
                ) : null}
                {filters.partnerFilterEnabled ? (
                    <Col
                        className={
                            'col-12 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-xl-2'
                        }
                    >
                        <div className="form-group">
                            <label htmlFor="partner">Partner</label>
                            <Dropdown
                                id="partner"
                                name="partner"
                                placeholder="Select Partner"
                                fluid
                                multiple
                                selection
                                search
                                options={partners}
                                value={filters.partners}
                                onChange={(e, data) => {
                                    setFilters({
                                        ...filters,
                                        partners: data.value,
                                        filtered: isFiltered(
                                            data.value,
                                            'partner'
                                        ),
                                    });
                                    changeFromQuery(data.value.length);
                                }}
                            />
                        </div>
                    </Col>
                ) : null}
                {filters.agencyFilterEnabled ? (
                    <Col
                        className={
                            'col-12 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-xl-2'
                        }
                    >
                        <div className="form-group">
                            <label htmlFor="agency">Agency</label>
                            <Dropdown
                                id="agency"
                                name="agency"
                                placeholder="Select Agency"
                                fluid
                                multiple
                                selection
                                search
                                options={agencies}
                                value={filters.agencies}
                                onChange={(e, data) => {
                                    setFilters({
                                        ...filters,
                                        counties: data.value,
                                        agencies: isFiltered(
                                            data.value,
                                            'agency'
                                        ),
                                    });
                                }}
                            />
                        </div>
                    </Col>
                ) : null}
                {filters.projectFilterEnabled ? (
                    <Col
                        className={
                            'col-12 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-xl-2'
                        }
                    >
                        <div className="form-group">
                            <label htmlFor="project">Project</label>
                            <Dropdown
                                id="project"
                                name="project"
                                placeholder="Select Project"
                                fluid
                                multiple
                                selection
                                search
                                options={projects}
                                value={filters.projects}
                                onChange={(e, data) => {
                                    setFilters({
                                        ...filters,
                                        projects: data.value,
                                        filtered: isFiltered(
                                            data.value,
                                            'project'
                                        ),
                                    });
                                }}
                            />
                        </div>
                    </Col>
                ) : null}
                {filters.fromDateFilterEnabled &&
                !filters.toDateFilterEnabled ? (
                    <Col
                        className={
                            'col-12 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-xl-2'
                        }
                    >
                        <div className="form-group">
                            <label htmlFor="fromDate">
                                //TODO: Revisit this logic
                                {filters.toDateFilterEnabled &&
                                !filters.toDateFilterEnabled
                                    ? 'From'
                                    : 'Period'}
                            </label>
                            <MonthRangeInput
                                name="fromDate"
                                dateFormat="MMM YYYY"
                                closable={true}
                                clearable={true}
                                maxDate={moment()}
                                placeholder="Period"
                                fluid
                                value={filters.toDate}
                                iconPosition="left"
                                onChange={(e, data) => {
                                    let date = data.value.split(' - ');
                                    setFilters({
                                        ...filters,
                                        fromDate: date[0],
                                        toDate: data.value + date[0],
                                        filtered: isFiltered(
                                            date[0],
                                            'fromdate'
                                        ),
                                    });

                                    // dispatch(actions.filterByFromDate(date[0]));
                                    // dispatch(
                                    //     actions.filterByToDate(
                                    //         data.value + date[0]
                                    //     )
                                    // );
                                }}
                            />
                        </div>
                    </Col>
                ) : null}
                {filters.toDateFilterEnabled ? (
                    <Col
                        className={
                            'col-12 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-xl-2'
                        }
                    >
                        <div className="form-group">
                            <label htmlFor="toDate">Date Range</label>

                            {/*<MonthRangeInput*/}
                            {/*    name="toDate"*/}
                            {/*    dateFormat="MMM YYYY"*/}
                            {/*    closable={true}*/}
                            {/*    clearable={true}*/}
                            {/*    maxDate={moment()}*/}
                            {/*    placeholder={'From and To'}*/}
                            {/*    fluid*/}
                            {/*    value={filters.toDate}*/}
                            {/*    iconPosition="left"*/}
                            {/*    onChange={(e, data) => {*/}
                            {/*        let date = data.value.split(' - ')*/}
                            {/*        console.log(date)*/}
                            {/*        dispatch(actions.filterByFromDate(date[0]));*/}
                            {/*        // date.length > 1 ? dispatch(actions.filterByToDate(date[1])): null;*/}
                            {/*    }}*/}
                            {/*/>*/}
                            <MonthRangeInput
                                name="toDate"
                                dateFormat="MMM YYYY"
                                closable={true}
                                clearable={true}
                                minDate={filters.fromDate}
                                maxDate={moment()}
                                placeholder="From - To"
                                fluid
                                value={filters.fromDate}
                                iconPosition="left"
                                onChange={(e, data) => {
                                    let date = data.value.split(' - ');
                                    setFilters({
                                        ...filters,
                                        fromDate: data.value,
                                        toDate: date[1],
                                        filtered: isFiltered(date[1], 'todate'),
                                    });
                                    // dispatch(
                                    //     actions.filterByFromDate(data.value)
                                    // );
                                    // dispatch(actions.filterByToDate(date[1]));
                                }}
                            />
                        </div>
                    </Col>
                ) : null}
                {filters.genderFilterEnabled ? (
                    <Col
                        className={
                            'col-12 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-xl-2'
                        }
                    >
                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <Dropdown
                                id="gender"
                                name="gender"
                                placeholder="Select Gender"
                                fluid
                                multiple
                                selection
                                search
                                options={genders}
                                value={filters.genders}
                                onChange={(e, data) => {
                                    setFilters({
                                        ...filters,
                                        genders: data.value,
                                        filtered: isFiltered(
                                            data.value,
                                            'gender'
                                        ),
                                    });
                                }}
                            />
                        </div>
                    </Col>
                ) : null}
                {filters.datimAgeGroupFilterEnabled ? (
                    <Col
                        className={
                            'col-12 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-xl-2'
                        }
                    >
                        <div className="form-group">
                            <label htmlFor="datimAgeGroup">Age Group</label>
                            <Dropdown
                                id="datimAgeGroup"
                                name="datimAgeGroup"
                                placeholder="Select Age Group"
                                fluid
                                multiple
                                selection
                                search
                                options={datimAgeGroups}
                                value={filters.datimAgeGroups}
                                onChange={(e, data) => {
                                    setFilters({
                                        ...filters,
                                        ageGroups: data.value,
                                        filtered: isFiltered(
                                            data.value,
                                            'agegroup'
                                        ),
                                    });
                                }}
                            />
                        </div>
                    </Col>
                ) : null}
                {filters.latestPregnancyFilterEnabled ? (
                    <Col
                        className={
                            'col-12 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-xl-2'
                        }
                    >
                        <div className="form-group">
                            <label htmlFor="latestPregnancy">Pregnancy</label>
                            <Dropdown
                                id="latestPregnancy"
                                name="latestPregnancy"
                                placeholder="Select Pregnancy"
                                fluid
                                multiple
                                selection
                                search
                                options={latestPregnancies}
                                value={filters.latestPregnancies}
                                onChange={(e, data) => {
                                    setFilters({
                                        ...filters,
                                        latestPregnancies: data.value,
                                        filtered: isFiltered(
                                            data.value,
                                            'pregnancy'
                                        ),
                                    });
                                }}
                            />
                        </div>
                    </Col>
                ) : null}
                {
                    filters.populationTypeFilterEnabled ? null : null
                    // <Col className={"col-12 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-xl-2"}>
                    //     <div className="form-group">
                    //         <label htmlFor="populationType">Population Type</label>
                    //         <Dropdown
                    //             id="populationType"
                    //             name="populationType"
                    //             placeholder="Select Population Type"
                    //             fluid
                    //             multiple
                    //             selection
                    //             search
                    //             options={populationTypes}
                    //             value={filters.populationTypes}
                    //             onChange={(e, data) => {
                    //                 dispatch(actions.filterByPopulationType(data.value));
                    //             }}
                    //         />
                    //     </div>
                    // </Col> : null
                }
                {filters.indicatorFilterEnabled &&
                ui.currentPage === PAGES.operationalHIS ? (
                    <Col
                        className={
                            'col-12 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-xl-2'
                        }
                    >
                        <div className="form-group">
                            <label htmlFor="indicator">Indicator</label>
                            <Dropdown
                                id="indicator"
                                name="indicator"
                                placeholder="Select Indicator"
                                fluid
                                selection
                                search
                                options={indicators}
                                value={
                                    filters.indicators
                                        ? filters.indicators
                                        : 'Tx_New'
                                }
                                onChange={(e, data) => {
                                    setFilters({
                                        ...filters,
                                        indicators: data.value,
                                    });
                                }}
                            />
                        </div>
                    </Col>
                ) : null}
            </Row>
        </>
    );
};;

export default UniversalFilter;
