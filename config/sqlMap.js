var sqlMap = {
    student: {
		queryAll: 'select * from t_stu',
		queryOne: 'select * from t_stu order by sno desc limit 1',
        add: 'insert into t_stu(sno, sname, sage) values (?, ?, ?)',
		edit: 'update t_stu set sname = ?,sage = ? where sno = ?',
		del: 'delete from t_stu  where sno = ?',
		queryChart: 'select * from t_sales',
		queryTitle: "select COLUMN_NAME,DATA_TYPE,COLUMN_COMMENT from information_schema.COLUMNS where table_name = 't_sales' and table_schema = 'student_info'",
		addChart: 'insert into t_sales(week,sales) values (?,?)',
		editChart: 'update t_sales set sales = ? where week = ? ',
		delChart: 'delete from t_sales where week = ? '
    }
}
    
module.exports = sqlMap;