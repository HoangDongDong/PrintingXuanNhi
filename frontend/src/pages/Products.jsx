import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [dbCategories, setDbCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get('/api/products'),
          axios.get('/api/categories')
        ]);
        setProducts(productsRes.data);
        setDbCategories(categoriesRes.data);
      } catch (err) {
        console.error('Error fetching data from DB:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const productList = [
    {
      id: 1,
      title: 'Name Card Cao Cấp',
      desc: 'Giấy mỹ thuật 300gsm, cán màng mờ, in 2 mặt sắc nét.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxdHHhr7il-_6Xm5Ul_7DR8l-RnjDIGZ0KygA1K7--kWj7FabntmeNoRcGtf2q4MmMftyOAZiEIy5W7omKy8d8kexR2VQxWfUBe_dNKS9icoANZZ8-kcbVqoxaPKQCSr-koH5MGRbh-FoFldmnf51N3a-gcHC70lZnI1-IGgNh-8mbDXNE7BFipSS-5pzwtv9gYM2wAwvPKBV-mL_-vuJAOmwxrgzlPNDSaAnvDBTVIdbluooSi9i9cg'
    },
    {
      id: 2,
      title: 'Catalogue Doanh Nghiệp',
      desc: 'Khổ A4, đóng kim hoặc keo gáy, màu sắc trung thực.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM8x4Jxic2AQdZEmpjOesegkjBSBqvslS-7kx2z8f8LIec1YAHLUyOJ2mYp2ZJXAgOnMyIvKuwdPmAx1o8Zn4ZopTTfVf4QkKFNW99sFI_lqEF6HvuteGVRUCCdG9GpnBElBSD9Tsl3S8iropobEBAGCdFcZc0yhFMr4txoGqMs61TR0RMtcEjyc3eh49Ukor8MkDZNqiEoCB81yHAXaTCM7x7CnYEPLepUm57TgiNSoIZTDVtUBtWRA'
    },
    {
      id: 3,
      title: 'Túi Giấy Kraft',
      desc: 'Chất liệu thân thiện, chịu lực tốt, in logo theo yêu cầu.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1FswSd6Oa3_caQgRqfVj7-vA8ZM2fk8quVnjzIX2E1uYFMFTc_WN0pP3n1WokX3T8nWlP9Q1EAo6ODpasPswSeeZPObxeVLGtBz3gCERLw2NcYpVXeZGpRyoYM-h-jN6iqZ73E3522mwYPPLf5JZ4kYgmOBoQncKDs4CxRqHCYO8vZwLXAc9wzThJ3szo2Iz2ZL7tM8NPfz0tUqYGLW4nSSRH4PRr5EpQ_q96A_qU4RHW6sEzvjXTcw'
    },
    {
      id: 4,
      title: 'Nhãn Decal Cuộn',
      desc: 'Chống nước, độ bám dính cao, bế hình theo file thiết kế.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjxfpg5R6jqYkLPafLmrbO0mDRci5ON0Tjuv8VFDgQ8awQNjXMQMGKRTy8hGh8RH81AYTqMy_eve4jVNshbJ88FKdkZFDmq2fh1_K0cGbd2iijHgZhz9tW7llrcwrmdHBxc_Amow1cod6UOU2ldQHNTVKA2g3j41eMeO3n_ShDQe3duudk6JkOXesO9CHFGxf0kLUvpx97tLp_jdn4qYhv55GlIB1wS0wrn_O-87g4I2IIzXUwt926Kg'
    },
    {
      id: 5,
      title: 'Tờ Gấp / Brochure',
      desc: 'Giấy Couche 150gsm, cấn 2 đường, in offset chất lượng cao.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbglSo0PwCB-RWsoqhtTKinDZniVgnxFEpeiTU9N57HUIeHS4P2t9IrUHc_e8LIecu627NW7NisR747vEBrz7exq4YWTy7aO8PyS3Ws63XEOn1Oic7lV4m9DS0_jLrtUZOq4k4ahy7fS8RSuABYMSRVGCxjXIec_9XLL1lTCimo3zqnNufZX2RvCDen3n-7HkD7wXVGXuTF8jaroTHHqJQbG9libskjuT3AMnj3tRneakNoWVomQSCvQ'
    },
    {
      id: 6,
      title: 'Bao Thư Văn Phòng',
      desc: 'Nắp dán keo sẵn, nhiều kích thước chuẩn (12x22, 16x23, 25x35).',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWFr8oHmtEw4S6gnXyHrRIK9A1HAQESp2Pp2o6fDqUA_W6_eDSl1TO9YtneWSdMALPjDUPNyJCGscZn7g3swjb46udGtr3pH9AFvfuUbPmEXdOy5VdU-wX7NdqJiNi9w7hoBUpK4y7_dLdNuZtQTI6zLJKr6l2iv-KyrdsmxovqfIUTAH_cqJ5T2FKgSDAfsZn7pI4JzMiBH3aSNYSiPKcmlLj9I_x83iUxVzhOYMCYmrGr9DBDKugLw'
    }
  ];

  const displayProducts = products.length > 0 ? products : productList;

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const categories = [
    { id: 1, name: 'Catalogue', icon: 'menu_book' },
    { id: 2, name: 'Hóa đơn', icon: 'receipt_long' },
    { id: 3, name: 'Hộp giấy', icon: 'package_2' },
    { id: 4, name: 'Túi giấy', icon: 'shopping_bag' },
    { id: 5, name: 'Nhãn Decal', icon: 'label' },
    { id: 6, name: 'Thiệp mời', icon: 'mail' },
    { id: 7, name: 'In name card', icon: 'badge' },
    { id: 8, name: 'In tờ gấp', icon: 'layers' },
    { id: 9, name: 'In Bao Thư', icon: 'drafts' },
    { id: 10, name: 'In Phiếu Quà Tặng', icon: 'confirmation_number' }
  ];

  const getProductCategory = (title) => {
    const t = title.toLowerCase();
    if (t.includes('catalogue')) return 'Catalogue';
    if (t.includes('phiếu') || t.includes('hóa đơn') || t.includes('phiêu') || t.includes('nhập kho') || t.includes('order') || t.includes('chi')) return 'Hóa đơn';
    if (t.includes('hộp')) return 'Hộp giấy';
    if (t.includes('túi')) return 'Túi giấy';
    if (t.includes('decal') || t.includes('ruy băng') || t.includes('nhãn')) return 'Nhãn Decal';
    if (t.includes('thiệp')) return 'Thiệp mời';
    if (t.includes('name card') || t.includes('danh thiếp')) return 'In name card';
    if (t.includes('tờ gấp') || t.includes('brochure') || t.includes('tờ rơi')) return 'In tờ gấp';
    if (t.includes('bao thư')) return 'In Bao Thư';
    if (t.includes('quà tặng')) return 'In Phiếu Quà Tặng';
    return 'Khác';
  };

  const displayCategories = dbCategories.length > 0 ? dbCategories : categories;

  const filteredProducts = selectedCategoryId
    ? displayProducts.filter(p => {
      if (dbCategories.length > 0) {
        return Number(p.categoryId) === Number(selectedCategoryId);
      } else {
        const catObj = categories.find(c => c.id === selectedCategoryId);
        return catObj ? getProductCategory(p.title) === catObj.name : true;
      }
    })
    : displayProducts;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen">
      <main className="max-w-[1200px] mx-auto px-margin-desktop py-12">
        {/* Breadcrumb */}
        <nav className="mb-12">
          <ol className="flex items-center gap-2 font-label-lg text-label-lg text-outline text-xs tracking-wider">
            <li className="hover:text-deep-navy transition-colors"><Link to="/">TRANG CHỦ</Link></li>
            <li>/</li>
            <li className="text-deep-navy font-bold">SẢN PHẨM IN ẤN</li>
          </ol>
        </nav>

        <div className="flex flex-col md:flex-row gap-gutter">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4">
            <div className="mb-6">
              <h2 className="font-headline-md text-headline-md text-deep-navy mb-2 text-xl font-bold">DANH MỤC</h2>
              <div className="w-12 h-1 bg-vibrant-orange"></div>
            </div>
            <ul className="flex flex-col border-t border-surface-container-highest">
              <li className="sidebar-item border-b border-surface-container-highest">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategoryId(null);
                    setCurrentPage(1);
                  }}
                  className={`flex items-center gap-3 py-4 transition-colors font-body-md cursor-pointer ${selectedCategoryId === null
                      ? 'text-vibrant-orange font-bold'
                      : 'text-on-surface-variant hover:text-vibrant-orange'
                    }`}
                  href="#"
                >
                  <span className="material-symbols-outlined text-[20px] sidebar-icon">apps</span>
                  Tất cả sản phẩm
                </a>
              </li>
              {displayCategories.map((cat, idx) => (
                <li key={cat.id || idx} className="sidebar-item border-b border-surface-container-highest">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategoryId(selectedCategoryId === cat.id ? null : cat.id);
                      setCurrentPage(1);
                    }}
                    className={`flex items-center gap-3 py-4 transition-colors font-body-md cursor-pointer ${selectedCategoryId === cat.id
                        ? 'text-vibrant-orange font-bold'
                        : 'text-on-surface-variant hover:text-vibrant-orange'
                      }`}
                    href="#"
                  >
                    <span className="material-symbols-outlined text-[20px] sidebar-icon">{cat.icon}</span>
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Product Grid */}
          <section className="w-full md:w-3/4">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-4 border-b border-surface-container-highest gap-4">
              <p className="text-on-surface-variant font-body-md text-sm">
                Hiển thị {filteredProducts.length > 0 ? indexOfFirstProduct + 1 : 0}–{Math.min(indexOfLastProduct, filteredProducts.length)} của {filteredProducts.length} sản phẩm
              </p>
              <div className="flex items-center gap-3 text-sm">
                <label className="text-label-sm uppercase tracking-wider text-outline">Sắp xếp theo:</label>
                <select className="bg-transparent border-none text-deep-navy font-bold focus:ring-0 cursor-pointer">
                  <option>Phổ biến nhất</option>
                  <option>Mới nhất</option>
                  <option>Giá: Thấp đến Cao</option>
                  <option>Giá: Cao đến Thấp</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProducts.map((product, idx) => (
                <div key={idx} className="product-card group bg-paper-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full rounded-lg border border-surface-container">
                  <div className="overflow-hidden mb-6 bg-surface-container aspect-square rounded-lg">
                    <img
                      className="product-image w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={product.imageUrl || product.img}
                      alt={product.title}
                    />
                  </div>
                  <h3 className="font-headline-md text-deep-navy mb-2 leading-tight font-bold text-lg">{product.title}</h3>
                  <p className="text-on-surface-variant text-body-md mb-6 flex-grow text-sm">{product.description || product.desc}</p>
                  <Link
                    to={`/san-pham/${product.id}`}
                    className="w-full text-center py-3 border border-deep-navy text-deep-navy font-semibold hover:bg-deep-navy hover:text-white transition-colors uppercase tracking-widest text-xs rounded-md"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center gap-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-all ${currentPage === page
                        ? 'bg-deep-navy text-white'
                        : 'border border-surface-container-highest text-on-surface-variant hover:border-deep-navy hover:text-deep-navy'
                      }`}
                  >
                    {page}
                  </button>
                ))}

                {currentPage < totalPages && (
                  <button
                    onClick={() => {
                      setCurrentPage(prev => prev + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 h-10 flex items-center justify-center rounded-lg border border-surface-container-highest hover:bg-vibrant-orange hover:border-vibrant-orange hover:text-white transition-all font-label-lg uppercase tracking-wide text-xs"
                  >
                    Tiếp
                  </button>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
