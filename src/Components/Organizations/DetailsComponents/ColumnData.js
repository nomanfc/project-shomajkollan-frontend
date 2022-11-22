export const ColumnDataFounder = [
    {
        Header: 'ক্রমিক নম্বর',
        accessor: 'serialNo'
    },
    {
        Header: 'নাম',
        accessor: 'name'
    },
    {
        Header: 'পদের নাম',
        accessor: 'designation'
    },
    {
        Header: 'জাতীয় পরিচয়পত্রের নম্বর',
        accessor: 'nid'
    },
    {
        Header: 'মোবাইল নম্বর',
        accessor: 'mobile'
    },
    {
        Header: 'বর্তমান ঠিকানা',
        accessor: 'address'
    },
    {
        Header: 'স্থায়ী ঠিকানা',
        accessor: 'permanentAdds'
    },
]

export const ColumnDataBank = [
    {
        Header: 'ব্যাংকের নাম',
        accessor: 'name'
    },
    {
        Header: 'হিসাব নম্বর',
        accessor: 'accountNo'
    },
    {
        Header: 'রাউটিং নম্বর',
        accessor: 'routingNo'
    },
    {
        Header: 'ব্যাংকের শাখা',
        accessor: 'branch'
    },
    {
        Header: 'ব্যাংক হিসাবের ধরন',
        accessor: 'type'
    },
]


export const ColumnDataOfficer = [
    {
        Header: 'ক্রমিক নম্বর',
        accessor: 'serialNo'
    },
    {
        Header: 'নাম',
        accessor: 'name'
    },
    {
        Header: 'পদের নাম',
        accessor: 'designation'
    },
    {
        Header: 'জাতীয় পরিচয়পত্রের নম্বর',
        accessor: 'nid'
    },
    {
        Header: 'মোবাইল নম্বর',
        accessor: 'mobile'
    },
    {
        Header: 'বর্তমান ঠিকানা',
        accessor: 'address'
    },
    {
        Header: 'স্থায়ী ঠিকানা',
        accessor: 'permanentAdds'
    },
]





export const ColumnData = [
    {
        Header: 'নাম',
        accessor: 'name'
    },
    {
        Header: 'পেশা',
        accessor: 'accountNo'
    },
    {
        Header: 'ঠিকানা',
        accessor: 'branch'
    },
    {
        Header: 'জাতীয় পরিচয়পত্রের নম্বর',
        accessor: 'type'
    },
]




















// id: 1,
// type: 'Web',
// name: 'MyName',
// subject: 'Render Issue',
// created: '07/01/1985',
// status: 'on progress',

export const FounderGroupColumnData =  [
    // { 
    //     Header: 'ID',
    //     Footer: 'ID',
    //     accessor: 'id'
    // },
    // {
    //     Header: 'Support ID',
    //     Footer: 'Support ID',
    //     accessor: 'name'
    // },
    {
        Header: 'প্রতিষ্ঠাতা সদস্যের বিবরণ',
        Footer: 'Ticket Info',
        columns : [
            {
                Header: 'Type',
                Footer: 'Type',
                accessor: 'type'
            },
            {
                Header: 'Subject',
                Footer: 'Subject',
                accessor: 'subject'
            },
            {
                Header: 'Created At',
                Footer: 'Creted At',
                accessor: 'createdat'
            },
            {
                Header: 'Status',
                Footer: 'Status',
                accessor: 'status'
            }
        ]
    }
]