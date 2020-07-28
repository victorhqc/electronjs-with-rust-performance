pub struct Pagination {
    pub offset: i64,
    pub limit: i64,
}

impl Pagination {
    pub fn from_js(page: i64, page_size: Option<i64>) -> Self {
        let limit = match page_size {
            Some(p) => p,
            None => 50,
        };
        let offset = limit * (page - 1);

        Self { offset, limit }
    }
}
